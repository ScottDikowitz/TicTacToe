(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    $("body").on("click", "li", function($e) {
      if (!($e.currentTarget.className === "ttt-marked") &&
          !(this.game.isOver())) {
        $li = $($e.currentTarget);
        this.makeMove($li);
      }
    }.bind(this));
  };

  View.prototype.displayGameWon = function() {
    $message = $("<p></p>");
    var winner = this.game.winner();
    if (winner === null) {
      $message.text("draw!");

    }
    else {
      $message.text(winner + " wins!");
    }
    this.$el.prepend($message);

  }

  View.prototype.makeMove = function ($square) {
    $square.addClass("ttt-marked");
    mark = this.game.currentPlayer === "x" ? "X" : "O";
    $square.text(mark);
    var arr = [[0,0], [0,1], [0,2],
               [1,0], [1,1], [1,2],
               [2,0], [2,1], [2,2]];
    var pos = arr[$square.attr('id')];
    this.game.playMove(pos);
    if (this.game.isOver()){
      this.displayGameWon();
    }
  };

  View.prototype.setupBoard = function () {
    $grid = $('<ul class="ttt-grid group"></ul>');
    for (var i = 0; i < 9; i++){
      $grid.append($("<li id=".concat(i).concat("></li>")));
    }
    this.$el.append($grid);
  };
})();
