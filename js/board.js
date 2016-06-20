var SIZE = 3;

// board object
function Board() {
  var state = [['-', '-', '-'],
               ['-', '-', '-'],
               ['-', '-', '-']];

  // sets the given position in the board i,j to a player 'X' or 'O'
  this.set = function(player, row, col) {
    state[row][col] = player;
  }

  // reads the current state of a given position
  // '-' not used, 'X' or 'O' used by players
  this.read = function(row, col) {
    return state[row][col];
  }

  // clones boards and returns a new board object
  this.clone = function() {
    var board = new Board();

    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        board.set(state[i][j], i ,j);
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
        return state [0][i];
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

// GAME function to generate all possible next moves for a given board and player (X or O)
function generate(board, player) {
  var result = []
  for (var i = 0; i < SIZE; i++) {
    for (var j = 0; j < SIZE; j++) {
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

// GAME - return game score
function score(board, maxPlayer, minPlayer) {
  if (board.isWin() === maxPlayer) {
    //console.log('Win: ' + maxPlayer);
    return 10;
  } else if (board.isWin() === minPlayer) {
    //console.log('Win: ' + minPlayer);
    return -10;
  } else {
    //console.log('Draw');
    return 0;
  }
}
var bestChoice;

// GAME - minimax algorithm
function minimax(board, maxPlayer) {
  // check if board is terminal node
  if (board.isTerminal()) {
    return score(board, 'X', 'O');
  }

  var scores = [];
  var nextMoves = [];


  // if next turn is for minPlayer
  if (maxPlayer) {
    // generate all possible next moves
    nextMoves = generate(board, 'O');
    // debug info
    // console.log('X player turn, boards generated: ' + nextMoves.length);
    // for (var h = 0; h < nextMoves.length; h++) {
    //   nextMoves[h].print();
    //   console.log('\n');
    // }
    // call minimax in all generated boards
    for (var i = 0; i < nextMoves.length; i++) {
      scores.push(minimax(nextMoves[i], false));
    }
    var maxScore = Math.max.apply(null, scores); // find min value in scores
    bestChoice = nextMoves[scores.indexOf(maxScore)];
    return maxScore;
  } else {
    // generate all possible next moves
    nextMoves = generate(board, 'O');
    // debug info
    // console.log('O player turn, boards generated: ' + nextMoves.length);
    // for (var h = 0; h < nextMoves.length; h++) {
    //   nextMoves[h].print();
    //   console.log('\n');
    // }
    // call minimax in all generated boards
    for (var j = 0; j < nextMoves.length; j++) {
      scores.push(minimax(nextMoves[j], true));
    }
    var minScore = Math.min.apply(null, scores); // Tfind max value in scores
    bestChoice = nextMoves[scores.indexOf(minScore)];
    return minScore;
  }
}

// tests
// var board = new Board();

// example terminal draw board
// board.set('O', 0, 0);
// board.set('O', 0, 1);
// board.set('X', 0, 2);
// board.set('X', 1, 0);
// board.set('X', 1, 1);
// board.set('O', 1, 2);
// board.set('O', 2, 0);
// board.set('X', 2, 1);
// board.set('X', 2, 2);

// example non-terminal board
// board.set('X', 0, 0);
// board.set('O', 0, 1);
// board.set('X', 0, 2);
// // board.set('O', 1, 0);
// board.set('O', 1, 1);
// // board.set('O', 1, 2);
// board.set('X', 2, 0);
// // board.set('O', 2, 1);
// board.set('O', 2, 2);
//
// board.print();
// console.log('\n');
// minimax(board, true);
// bestChoice.print();

// var boards = generate(board, 'X');
// for (var i = 0; i < boards.length; i++) {
//   boards[i].print();
//   console.log('\n');
// }
