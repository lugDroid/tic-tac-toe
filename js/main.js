$(document).ready(function() {
  // create new board
  // TODO: create a start button, bind it and move this part to
  // game.start() method
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

  // binded functions
  function playerMove(e) {
    var id = e.target.id;
    var col = id[0];
    var row = id[1];
    console.log(board.isWin());

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

      // generate resul
      if (nextMove.score >= 9) {
        $('#result').html('You lost!');
      } else if (nextMove.score <= -9) {
        $('#result').html('You won!');
      }
    }
  }

  function computerStart(e) {
    console.log('Before add class');
    $('#' + e.target.id).addClass('btn-selected');
    $('#' + e.target.id).siblings().removeClass('btn-selected');
    console.log('After add class');
    board = game.start();
    // render(board);
    console.log('Before calculating');
    nextMove = game.nextMove(board);
    console.log('After calculating')
    board = nextMove.board;
    render(board);
  }

  function playerStart(e) {
    $('#' + e.target.id).addClass('btn-selected');
    $('#' + e.target.id).siblings().removeClass('btn-selected');
    board = game.start();
    render(board);
  }
});
