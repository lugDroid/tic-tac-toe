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

  // function to return one of the squares as next move if computer starts game
  function computerFirstMove() {
    var n = Math.round(Math.random() * 3);
    console.log(n);

    switch (n) {
      case 0:
        board.set('X', 0, 0);
        break;
      case 1:
        board.set('X', 0, 2);
        break;
      case 2:
        board.set('X', 2, 0);
        break;
      case 3:
        board.set('X', 2, 2);
        break;
    }

    return board;
  }

  // returned object
  return {
    start: start,
    nextMove: nextMove,
    computerFirstMove: computerFirstMove
  }
})();
