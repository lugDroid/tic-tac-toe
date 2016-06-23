$(document).ready(function() {
  // create new board
  // TODO: create a start button, bind it and move this part to
  // game.start() method
  var board, nextMove;

  // cache DOM
  var $square = $('.row .square');
  var $squares = [[$('#00'), $('#01'), $('#02')],
                  [$('#10'), $('#11'), $('#12')],
                  [$('#20'), $('#21'), $('#22')]];
  var $result = $('#result');
  var $computerBtn = $('#computer');
  var $playerBtn = $('#player');

  // bind events
  $square.click(playerMove);
  $computerBtn.click(computerStart);
  $playerBtn.click(playerStart);

  // render
  function render(board) {
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
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

    // only if square is still empty
    if (board.read(col, row) === '-') {
      // update view and set square on board object
      $('#' + id).addClass("fa fa-circle-o");
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

  function computerStart() {
    board = game.start();
    render(board);
    nextMove = game.nextMove(board);
    board = nextMove.board;
    console.log(board);
    render(board);
  }

  function playerStart() {
    board = game.start();
    render(board);
  }
});
