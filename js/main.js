$(document).ready(function() {
  // create new board
  // TODO: create a start button, bind it and move this part to
  // game.start() method
  var board = game.start();

  // cache DOM
  var $square = $('.row .square');
  var $squares = [[$('#00'), $('#01'), $('#02')],
                  [$('#10'), $('#11'), $('#12')],
                  [$('#20'), $('#21'), $('#22')]];

  // bind events
  $square.click(playerMove);

  // render
  function render(board) {
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        if (board.read(i, j) === 'X') {
          $squares[i][j].addClass('fa fa-times');
        } else if (board.read(i, j) === 'O') {
          $squares[i][j].addClass('fa fa-circle-o');
        }
      }
    }
  }

  // functions
  function playerMove(e) {
    var id = e.target.id;
    console.log('Square clicked:' + id)
    // update view and set square on board object
    $('#' + id).addClass("fa fa-circle-o");
    board.set('O', id[0], id[1]);
    // calculate next move
    board = game.nextMove(board)

    render(board);

  }
});

// fontawesome classes to add
// fa fa-times X
// fa fa-circle-o O
