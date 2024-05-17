const container = document.querySelector(".container");

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

function initGame() {
  let gameBoard;
  let currentPlayer = 1;

  setBoard();
  clickHandlerBoard(gameBoard);

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
      let isWin = checkWin(players[player]);

      if (isWin) {
        clearGame();
      }

      renderDomBoard(gameBoard);
    }
  }

  function clickHandlerBoard(gameBoard) {
    gameBoard.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const currentCell = selectById(`#cell_${rowIndex + "_" + columnIndex}`);
        currentCell.addEventListener("click", (event) => {
          const value = event.target.textContent;
          const clickOn = event.target.id;

          if (value === "") {
            if (currentPlayer === 1) {
              putMarks(1, [rowIndex, columnIndex]);
              currentPlayer = 2;
            } else {
              putMarks(2, [rowIndex, columnIndex]);
              currentPlayer = 1;
            }
          }
        });
      });
    });
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
            return true;
          }
        });
      });

      if (count === 3) {
        return true;
      }
    }
    return false;
  }

  function setBoard() {
    gameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  function clearGame() {
    currentPlayer = 1;

    setBoard();
    players[1] = ["player1", []];
    players[2] = ["player2", []];
  }

  function writePlayerMoves(player, square) {
    players[player][1].push(square);
  }

  return { putMarks, choiceSquare };
}

const game = initGame();

// game.putMarks(1, game.choiceSquare(1, 1));
// game.putMarks(2, game.choiceSquare(1, 2));
// game.putMarks(1, game.choiceSquare(2, 1));
// game.putMarks(2, game.choiceSquare(1, 3));
// game.putMarks(1, game.choiceSquare(2, 2));

function renderDomBoard(gameBoard) {
  gameBoard.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const currentCell = selectById(`#cell_${rowIndex + "_" + columnIndex}`);
      currentCell.textContent = column;
    });
  });
}

function selectById(selector) {
  return document.querySelector(selector);
}

function compareArrays(a, b) {
  return a.toString() === b.toString();
}
