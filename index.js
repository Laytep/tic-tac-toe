const winningCombination = {
  1: [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  2: [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  3: [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  4: [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  5: [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  6: [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  7: [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  7: [
    [2, 0],
    [1, 1],
    [0, 2],
  ],
};

const compareArrays = (a, b) => {
  return a.toString() === b.toString();
};

const game = {
  gameBoard: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  players: { 1: ["player1", []], 2: ["player2", []] },
  putMarks: function (player, square) {
    const [row, column] = square;

    if (game.gameBoard[row][column] === "") {
      this.writePlayerMoves(player, square);
      if (player === 1) {
        game.gameBoard[row][column] = "X";
      } else {
        game.gameBoard[row][column] = "O";
      }
    }
  },
  choiceSquare: function (row, column) {
    return [row - 1, column - 1];
  },
  checkWin: function (player) {
    const playerMoves = player[1];
    const playerName = player[0];

    for (const combination in winningCombination) {
      const arrayWinningCombination = winningCombination[combination];

      let count = 0;
      arrayWinningCombination.map((move) => {
        playerMoves.map((playerMove) => {
          if (compareArrays(playerMove, move)) {
            count++;
          }
          if (count === 3) {
            console.log(`${playerName} win!`);
            this.clearGame();
          }
        });
      });
    }
  },
  clearGame: function () {
    this.gameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.players[1] = ["player1", []];
    this.players[2] = ["player2", []];
  },
  writePlayerMoves: function (player, square) {
    this.players[player][1].push(square);

    this.checkWin(game.players[player]);
  },
};

game.putMarks(1, game.choiceSquare(1, 1));
game.putMarks(2, game.choiceSquare(1, 2));
game.putMarks(1, game.choiceSquare(2, 1));
game.putMarks(2, game.choiceSquare(1, 3));
game.putMarks(1, game.choiceSquare(3, 1));
