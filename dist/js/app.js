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
      if ((player === 'X') || (player === 'O') || (player === '-')) {
        state[row][col] = player;
      } else {
        console.log('Not a valid player symbol: ' + player);
      }
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
          newBoard = board.clone();
          newBoard.set(player, i, j);
          result.push(newBoard);
        }
      }
    }
    return result;
  }

  // return game score
  function score(board, maxPlayer, minPlayer, depth) {
    if (board.isWin() === maxPlayer) {
      return 10 - depth;
    } else if (board.isWin() === minPlayer) {
      return depth - 10;
    } else {
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
    nextMove: nextMove
  }
})();

$(document).ready(function() {
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
  var $restartBtn = $('#restart');
  var $controls = $('.controls');

  // bind events
  $square.click(playerMove);
  $square.hover(overlayMove, removeOverlay);
  $computerBtn.click(computerStart);
  $playerBtn.click(playerStart);
  $restartBtn.click(restart);

  // render function
  function render(board) {
    for (var i = 0; i < board.size(); i++) {
      for (var j = 0; j < board.size(); j++) {
        if (board.read(i, j) === 'X') {
          $squares[i][j].removeClass('fa-circle-o').addClass('fa fa-times');
        } else if (board.read(i, j) === 'O') {
          $squares[i][j].removeClass('fa-times').addClass('fa fa-circle-o');
        } else {
          $squares[i][j].removeClass('fa fa-circle-o fa-times');
        }
      }
    }
  }

  // start new game function
  function startGame(e) {
    // start new game
    board = game.start();

    // update game info
    $($result).html('Your turn');
  }

  // overlay next-move function
  function overlayMove(e) {
    // extract col and row info from html element id
    var col = this.id[0];
    var row = this.id[1];
    // check if game is already started
    if (board !== undefined) {
      // add overlay if empty squre
      if (board.read(col, row) === '-') {
        $(this).addClass('fa fa-circle-o dim');
      }
    }
  }

  function removeOverlay() {
    // extract col and row info from html element id
    var col = this.id[0];
    var row = this.id[1];
    // check if game is already started
    if (board !== undefined) {
      // add overlay if empty squre
      if (board.read(col, row) === '-') {
        $(this).removeClass('fa fa-circle-o dim');
      }
    }
  }

  // player click on board
  function playerMove(e) {
    var col = this.id[0];
    var row = this.id[1];

    // only if square is still empty
    // and board is not already a win
    if ((board.read(col, row) === '-') & (board.isWin() === -1)) {
      // update view and set square on board object
      $(this).addClass('fa fa-circle-o');
      $(this).removeClass('dim');
      board.set('O', col, row);

      // calculate next move
      nextMove = game.nextMove(board);
      board = nextMove.board;
      // render next board
      render(board);

      if (nextMove.score >= 9) {
        $($result).html('You lost! Want to play again?');
        $($controls).children().show();
        $($restartBtn).hide();
      } else if (nextMove.score <= -9) {
        $($result).html('You won! Want to play again?');
        $($controls).children().show();
        $($restartBtn).hide();
      } else if (board.isDraw()) {
        $($result).html('Draw! Want to play again?');
        $($controls).children().show();
        $($restartBtn).hide();
      } else {
        $($result).html('Your turn...');
      }
    }
  }

  function computerStart(e) {
    // add and remove button clicked state
    //$(this).addClass('btn-selected').siblings().removeClass('btn-selected');
    // $(this).siblings().removeClass('btn-selected');
    $(this).hide();
    $(this).siblings().hide();
    $($restartBtn).show().css('display', 'block');

    // update buttons and start a new game
    startGame(e);

    // calculate computer move
    nextMove = game.nextMove(board);
    board = nextMove.board;

    render(board);
  }

  function playerStart(e) {
    //$(this).addClass('btn-selected').siblings().removeClass('btn-selected');
    $(this).hide();
    $(this).siblings().hide();
    $($restartBtn).show().css('display', 'block');

    // update buttons and start a new game
    startGame(e);

    // render new board
    render(board);
  }

  function restart() {
    // start a new game
    board = game.start();

    // render new board
    render(board);

    // hide restart button and show players buttons
    $(this).hide();
    $($controls).children().show();

    // update info
    $($result).html('Who will start playing?');
  }
});
