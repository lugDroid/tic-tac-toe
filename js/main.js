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
  $computerBtn.mousedown(startGame);
  $playerBtn.mousedown(startGame);
  $computerBtn.mouseup(firstMove);
  $playerBtn.mouseup(firstMove);
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

  // overlay next-move function
  function overlayMove(e) {
    // extract col and row info from html element id
    var col = this.id[0];
    var row = this.id[1];
    // check if game is already started
    if (board !== undefined) {
      if (board.isWin() === -1) {
        // add overlay if empty square
        if (board.read(col, row) === '-') {
          $(this).addClass('fa fa-circle-o dim');
        }
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
    // and is player tunr
    if ((board.read(col, row) === '-') && (board.isWin() === -1)) {
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

  function startGame() {
    $($result).html('Calculating...');

    // start new game
    board = game.start();
    render(board);

    // unbind square click listener to prevent clicks while computing next move
    //$square.unbind('click');
  }

  function firstMove() {
    // hide players buttons and show restart button
    $(this).hide();
    $(this).siblings().hide();
    $($restartBtn).show().css('display', 'block');

    // calculate computer move
    if (this.id === 'computer') {
      //nextMove = game.nextMove(board);
      //board = nextMove.board;
      board = game.computerFirstMove();
    }

    // update game info
    $($result).html('Your turn');

    render(board);

    // bind square click listener again
    //$square.click(playerMove);
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

    // make board not playable
    board = undefined;
  }
});
