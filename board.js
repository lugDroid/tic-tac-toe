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

// generic function to generate all possible next moves for a given board and player (X or O)
function generate(board, player) {
  var result = []
  for (var i = 0; i < SIZE; i++) {
    for (var j = 0; j < SIZE; j++) {
        if (board.read(i, j) === '-') {
          newBoard = board.clone();
          newBoard.set(player, i, j);
          result.push(newBoard);
          break;
        }
    }
  }
  return result;
}

// tests
var board = new Board();

var boards = generate(board, 'X');
console.log(boards.length);
for (var i = 0; i < boards.length; i++) {
  boards[i].print();
  console.log('\n');
}
