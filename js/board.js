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
