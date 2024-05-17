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

function initGame() {
  let gameBoard;

  setBoard();

  const players = { 1: ["player1", []], 2: ["player2", []] };

  function putMarks(player, square) {
    const [row, column] = square;

    if (gameBoard[row][column] === "") {
      writePlayerMoves(player, square);
      if (player === 1) {
        gameBoard[row][column] = "X";
      } else {
        gameBoard[row][column] = "O";
      }
    }
  }
  function choiceSquare(row, column) {
    return [row - 1, column - 1];
  }
  function checkWin(player) {
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
            clearGame();
          }
        });
      });
    }
  }

  function setBoard() {
    gameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  function clearGame() {
    setBoard();
    players[1] = ["player1", []];
    players[2] = ["player2", []];
  }
  function writePlayerMoves(player, square) {
    players[player][1].push(square);

    checkWin(players[player]);
  }

  return { putMarks, choiceSquare };
}

const game = initGame();

game.putMarks(1, game.choiceSquare(1, 1));
game.putMarks(2, game.choiceSquare(1, 2));
game.putMarks(1, game.choiceSquare(2, 1));
game.putMarks(2, game.choiceSquare(1, 3));
game.putMarks(1, game.choiceSquare(3, 1));
