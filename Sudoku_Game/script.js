
const boardElement = document.getElementById("sudoku-board");
const messageElement = document.getElementById("message");
let solution = [];
let timer = 0;
let interval;
let solvedCount = parseInt(localStorage.getItem("solved") || "0");
let fastest = parseInt(localStorage.getItem("fastest") || "-1");

document.getElementById("solved-count").textContent = solvedCount;
document.getElementById("fastest-time").textContent = fastest >= 0 ? fastest : "N/A";

function generateEmptyBoard() {
  boardElement.innerHTML = "";
  for (let i = 0; i < 81; i++) {
    const cell = document.createElement("input");
    cell.type = "text";
    cell.inputMode = "numeric";
    cell.pattern = "[1-9]";
    cell.maxLength = 1;
    cell.dataset.index = i;
    cell.addEventListener("input", () => {
      cell.value = cell.value.replace(/[^1-9]/g, "").slice(0, 1);
    });
    boardElement.appendChild(cell);
  }
}


function fillBoard(puzzle) {
  boardElement.querySelectorAll("input").forEach((cell, i) => {
    const value = puzzle[i];
    if (value !== 0) {
      cell.value = value;
      cell.classList.add("prefilled");
      cell.disabled = true;
    } else {
      cell.value = "";
      cell.classList.remove("prefilled");
      cell.disabled = false;
    }
  });
}

function getUserBoard() {
  return [...boardElement.querySelectorAll("input")].map(cell => parseInt(cell.value) || 0);
}

function checkSolution() {
  const current = getUserBoard();
  const isCorrect = current.every((val, i) => val === solution[i]);

  if (isCorrect) {
    messageElement.textContent = "✅ Congratulations! Puzzle solved!";
    messageElement.style.color = "green";
    clearInterval(interval);
    solvedCount++;
    localStorage.setItem("solved", solvedCount);
    document.getElementById("solved-count").textContent = solvedCount;
    if (fastest < 0 || timer < fastest) {
      fastest = timer;
      localStorage.setItem("fastest", fastest);
      document.getElementById("fastest-time").textContent = fastest;
    }
  } else {
    messageElement.textContent = "❌ Incorrect solution.";
    messageElement.style.color = "red";
  }
}

function resetBoard() {
  if (!confirm("Reset all your inputs?")) return;
  boardElement.querySelectorAll("input").forEach(cell => {
    if (!cell.classList.contains("prefilled")) {
      cell.value = "";
    }
  });
  messageElement.textContent = "";
}

function giveHint() {
  const inputs = boardElement.querySelectorAll("input");
  for (let i = 0; i < 81; i++) {
    if (!inputs[i].disabled && !inputs[i].value) {
      inputs[i].value = solution[i];
      break;
    }
  }
}

function resetStats() {
  if (confirm("Reset all stats?")) {
    localStorage.removeItem("solved");
    localStorage.removeItem("fastest");
    document.getElementById("solved-count").textContent = "0";
    document.getElementById("fastest-time").textContent = "-";
    solvedCount = 0;
    fastest = -1;
  }
}

function generateSudoku() {
  const SIZE = 9;
  const BOX_SIZE = 3;

  function isSafe(board, row, col, num) {
    for (let x = 0; x < SIZE; x++) {
      if (board[row][x] === num || board[x][col] === num) return false;
    }
    const startRow = row - row % BOX_SIZE;
    const startCol = col - col % BOX_SIZE;
    for (let r = 0; r < BOX_SIZE; r++) {
      for (let c = 0; c < BOX_SIZE; c++) {
        if (board[startRow + r][startCol + c] === num) return false;
      }
    }
    return true;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function fillFullBoard(board) {
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (board[row][col] === 0) {
          const nums = shuffle([...Array(SIZE).keys()].map(n => n + 1));
          for (let num of nums) {
            if (isSafe(board, row, col, num)) {
              board[row][col] = num;
              if (fillFullBoard(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  function removeCells(board, clues = 35) {
    let removed = SIZE * SIZE - clues;
    while (removed > 0) {
      const row = Math.floor(Math.random() * SIZE);
      const col = Math.floor(Math.random() * SIZE);
      if (board[row][col] !== 0) {
        board[row][col] = 0;
        removed--;
      }
    }
    return board;
  }

  let board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  fillFullBoard(board);
  const fullSolution = board.flat();
  const puzzleBoard = board.map(row => [...row]);
  removeCells(puzzleBoard, 35);
  solution = fullSolution;
  fillBoard(puzzleBoard.flat());
}

function generateNewGame() {
  generateEmptyBoard();
  generateSudoku();
  messageElement.textContent = "";
  timer = 0;
  document.getElementById("timer").textContent = timer;
  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    document.getElementById("timer").textContent = timer;
  }, 1000);
}

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

window.onload = () => {
  generateNewGame();
};