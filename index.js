const container = document.querySelector(".container");
const player1Score = document.querySelector("#player1-score");
const player2Score = document.querySelector("#player2-score");
const restartGameButton = document.querySelector("#restart");

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
  8: [
    [2, 0],
    [1, 1],
    [0, 2],
  ],
};

function GameController() {
  let gameBoard;
  let currentPlayer = 1;

  setBoard();
  clickHandlerBoard(gameBoard);

  const players = { 1: ["player1", []], 2: ["player2", []] };
  const playerScore = { 1: 0, 2: 0 };

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
      let isTie = checkTie();

      if (isWin || isTie) {
        if (isWin) {
          playerScore[player]++;
        } else if (isTie) {
          console.log("It's a tie");
        }

        clearGame();
      }

      screenControl.renderDomBoard(gameBoard);
      screenControl.updatePlayerScore(playerScore);
    }
  }

  function clickHandlerBoard(gameBoard) {
    gameBoard.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const currentCell = selectById(`#cell_${rowIndex + "_" + columnIndex}`);
        currentCell.addEventListener("click", (event) => {
          const value = event.target.textContent;

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

  function checkTie() {
    let emptyCell = false;

    gameBoard.forEach((row) => {
      row.forEach((column) => {
        if (column === "") emptyCell = true;
      });
    });
    return !emptyCell;
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

  function clearScore() {
    playerScore[1] = 0;
    playerScore[2] = 0;
    screenControl.updatePlayerScore(playerScore);
  }

  function writePlayerMoves(player, square) {
    players[player][1].push(square);
  }

  return { clearGame, clearScore };
}

const game = GameController();

function selectById(selector) {
  return document.querySelector(selector);
}

function compareArrays(a, b) {
  return a.toString() === b.toString();
}

function ScreenController() {
  restartGameButton.addEventListener("click", (event) => {
    game.clearGame(), game.clearScore();
  });

  function renderDomBoard(gameBoard) {
    gameBoard.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        const currentCell = selectById(`#cell_${rowIndex + "_" + columnIndex}`);
        currentCell.textContent = column;
      });
    });
  }

  function updatePlayerScore(playerScore) {
    player1Score.textContent = playerScore[1];
    player2Score.textContent = playerScore[2];
  }

  return { renderDomBoard, updatePlayerScore };
}
const screenControl = ScreenController();
