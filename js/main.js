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

  // start new game function
  function startGame(e) {
    // add and remove button clicked state
    $('#' + e.target.id).addClass('btn-selected');
    $('#' + e.target.id).siblings().removeClass('btn-selected');

    // start new game
    board = game.start();

    // update game info
    updateInfo(board);
  }

  // player click on board
  function playerMove(e) {
    var id = e.target.id;
    var col = id[0];
    var row = id[1];

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

      updateInfo(nextMove.score);
    }
  }

  // display game info
  function updateInfo(status) {
    var message;
    if (typeof status === Object) {
      message = board.isDraw() ? 'Draw! Want to play again?' : 'Your turn';
    } else {
      if (status >= 9) {
        message = 'You lost! Want to play again?';
      } else if (status <= -9) {
        message = 'You won! Want to play again?';
      } else {
        message = 'Your turn';
      }
    }

    $($result).html(message);
  }

  function computerStart(e) {
    // update buttons and start a new game
    startGame(e);

    // calculate computer move
    nextMove = game.nextMove(board);
    board = nextMove.board;

    render(board);
  }

  function playerStart(e) {
    // update buttons and start a new game
    startGame(e);

    // render new board
    render(board);
  }
});
