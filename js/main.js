$(document).ready(function() {
  var game = (function() {
    // create new board
    var board = new Board();

    // cache DOM
    var $square = $('.row .square');
    var $squares = [[$('#00'), $('#01'), $('#02')],
                 [$('#10'), $('#11'), $('#12')],
                 [$('#20'), $('#21'), $('#22')]];

    // bind events
    $square.click(playerMove);

    function playerMove(e) {
      var id = e.target.id;
      console.log('Square clicked:' + id)
      $('#' + id).addClass("fa fa-times");
      board.set('X', id[0], id[1]);

      minimax(board, true);
      render(bestChoice);

      board = bestChoice;
    }

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
  });

  game();

    //board.print();

    // minimax(board, true);
    // bestChoice.print();
});


// fontawesome classes to add
// fa fa-times X
// fa fa-circle-o O
