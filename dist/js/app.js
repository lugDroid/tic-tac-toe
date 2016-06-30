  // board object
  function Board() {
    var SIZE = 3;
    var state = [
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ];

    // sets the given position in the board i,j to a player 'X' or 'O'
    this.set = function(player, row, col) {
      state[row][col] = player;
    }

    // reads the current state of a given position
    // '-' not used, 'X' or 'O' used by players
    this.read = function(row, col) {
      return state[row][col];
    }

    // return board SIZE
    this.size = function() {
      return SIZE;
    }

    // clones boards and returns a new board object
    this.clone = function() {
      var board = new Board();

      for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
          board.set(state[i][j], i, j);
        }
      }
      return board;
    }

    // check if board is a winning board. If true returns winning player, else -1
    this.isWin = function() {
      for (var i = 0; i < SIZE; i++) {
        // check horizontals
        if (state[i][0] === state[i][1] && state[i][0] === state[i][2] && state[i][0] !== '-') {
          return state[i][0];
        }
        // check verticals
        if (state[0][i] === state[1][i] && state[0][i] === state[2][i] && state[0][i] !== '-') {
          return state[0][i];
        }
      }
      // check diagonals
      if (state[0][0] === state[1][1] && state[0][0] === state[2][2] && state[0][0] !== '-') {
        return state[0][0];
      }
      if (state[0][2] === state[1][1] && state[0][2] == state[2][0] && state[0][2] !== '-') {
        return state[0][2];
      }
      // if no winning condition
      return -1
    }

    // check if board is a draw
    this.isDraw = function() {
      // if board is win return inmediately
      if (this.isWin() !== -1) {
        return false;
      } else {
        var isDraw = true;
        for (var i = 0; i < SIZE; i++) {
          for (var j = 0; j < SIZE; j++) {
            if (state[i][j] === '-') {
              isDraw = false;
            }
          }
        }
        return isDraw;
      }
    }

    // check is board is terminal, is either win or draw
    this.isTerminal = function() {
      if (this.isWin() !== -1 || this.isDraw()) {
        return true;
      } else {
        return false;
      }
    }

    // prints board into console
    this.print = function() {
      var str = '';
      for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
          str += state[i][j];
        }
        console.log(str);
        str = '';
      }
    }
  }

var game = (function() {
  var board;
  var bestChoice;

  // start new game function
  function start() {
    board = new Board();
    return board;
  }

  // function to generate all possible next moves for a given board
  // and player (X or O)
  function generate(board, player) {
    var result = []
    for (var i = 0; i < board.size(); i++) {
      for (var j = 0; j < board.size(); j++) {
        if (board.read(i, j) === '-') {
          //console.log('Empty position found at ' + i + ', ' + j);
          newBoard = board.clone();
          newBoard.set(player, i, j);
          result.push(newBoard);
          //console.log(result.length + ' new boards generated so far');
        }
      }
    }
    return result;
  }

  // return game score
  function score(board, maxPlayer, minPlayer, depth) {
    if (board.isWin() === maxPlayer) {
      //console.log('Win: ' + maxPlayer);
      return 10 - depth;
    } else if (board.isWin() === minPlayer) {
      //console.log('Win: ' + minPlayer);
      return depth - 10;
    } else {
      //console.log('Draw');
      return 0;
    }
  }

  // minimax algorithm
  function minimax(board, maxPlayer, depth) {
    var scores = [];
    var nextMoves = [];

    // check if board is terminal node
    if (board.isTerminal()) {
      return score(board, 'X', 'O', depth);
    }

    // if next turn is for minPlayer
    if (maxPlayer) {
      // generate all possible next moves
      nextMoves = generate(board, 'X');

      // call minimax in all generated boards
      for (var i = 0; i < nextMoves.length; i++) {
        scores.push(minimax(nextMoves[i], false, depth + 1));
      }
      var maxScore = Math.max.apply(null, scores); // find min value in scores
      bestChoice = nextMoves[scores.indexOf(maxScore)];
      // console.log("Board score (max):" + maxScore);
      // bestChoice.print();
      return maxScore;
    } else {
      // generate all possible next moves
      nextMoves = generate(board, 'O');

      // call minimax in all generated boards
      for (var j = 0; j < nextMoves.length; j++) {
        scores.push(minimax(nextMoves[j], true, depth + 1));
      }
      var minScore = Math.min.apply(null, scores); // find max value in scores
      bestChoice = nextMoves[scores.indexOf(minScore)];
      // console.log("Board score (min): " + minScore);
      // bestChoice.print();
      return minScore;
    }
  }

  // minimax wrapper function
  function nextMove(board) {
    var score = minimax(board, true, 0);
    return {
      board: bestChoice,
      score: score
    }
  }

  // returned object
  return {
    start: start,
    // update: update,
    nextMove: nextMove
  }
})();

$(document).ready(function() {
  // create new board
  // TODO: create a start button, bind it and move this part to
  // game.start() method
  var board, nextMove;

  // cache DOM
  var $square = $('.row .square');
  var $squares = [
    [$('#00'), $('#01'), $('#02')],
    [$('#10'), $('#11'), $('#12')],
    [$('#20'), $('#21'), $('#22')]
  ];
  var $result = $('#result');
  var $computerBtn = $('#computer');
  var $playerBtn = $('#player');

  // bind events
  $square.click(playerMove);
  $computerBtn.click(computerStart);
  $playerBtn.click(playerStart);

  // render function
  function render(board) {
    for (var i = 0; i < board.size(); i++) {
      for (var j = 0; j < board.size(); j++) {
        if (board.read(i, j) === 'X') {
          $squares[i][j].addClass('fa fa-times');
        } else if (board.read(i, j) === 'O') {
          $squares[i][j].addClass('fa fa-circle-o');
        } else {
          $squares[i][j].removeClass('fa fa-circle-o fa-times');
        }
      }
    }
  }

  // binded functions
  function playerMove(e) {
    var id = e.target.id;
    var col = id[0];
    var row = id[1];
    console.log(board.isWin());

    // only if square is still empty
    // and board is not already a win
    if ((board.read(col, row) === '-') & (board.isWin() === -1)) {
      // update view and set square on board object
      $('#' + id).addClass('fa fa-circle-o');
      board.set('O', col, row);

      // calculate next move
      nextMove = game.nextMove(board);
      board = nextMove.board;
      // render next board
      render(board);

      // generate resul
      if (nextMove.score >= 9) {
        $('#result').html('You lost!');
      } else if (nextMove.score <= -9) {
        $('#result').html('You won!');
      }
    }
  }

  function computerStart(e) {
    console.log('Before add class');
    $('#' + e.target.id).addClass('btn-selected');
    $('#' + e.target.id).siblings().removeClass('btn-selected');
    console.log('After add class');
    board = game.start();
    // render(board);
    console.log('Before calculating');
    nextMove = game.nextMove(board);
    console.log('After calculating')
    board = nextMove.board;
    render(board);
  }

  function playerStart(e) {
    $('#' + e.target.id).addClass('btn-selected');
    $('#' + e.target.id).siblings().removeClass('btn-selected');
    board = game.start();
    render(board);
  }
});
