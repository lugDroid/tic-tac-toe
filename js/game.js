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
