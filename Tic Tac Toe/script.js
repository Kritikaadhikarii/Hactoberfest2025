const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessage = document.getElementById("winningMessage");
const messageText = document.getElementById("messageText");
const restartButton = document.getElementById("restartButton");

const X_CLASS = "X";
const O_CLASS = "O";
let oTurn;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  oTurn = false;
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS, O_CLASS);
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningMessage.style.display = "none";
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  cell.textContent = currentClass;
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    oTurn = !oTurn;
  }
}

function endGame(draw) {
  if (draw) {
    messageText.textContent = "It's a Draw!";
  } else {
    messageText.innerHTML = `${oTurn ? "O" : "X"} Wins! 🎉`;
    messageText.classList.add("winner");
  }
  winningMessage.style.display = "block";
}

function isDraw() {
  return [...cells].every(cell =>
    cell.textContent === X_CLASS || cell.textContent === O_CLASS
  );
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentClass;
    });
  });
}
