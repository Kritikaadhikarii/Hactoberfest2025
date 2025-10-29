const numSquares = 6;
let colors = [];
let pickedColor;

const colorDisplay = document.getElementById("colorDisplay");
const squaresContainer = document.getElementById("container");
const messageDisplay = document.getElementById("message");
const resetButton = document.getElementById("reset");
const h1 = document.querySelector("h1");

// Initialize game
init();

function init() {
  setupSquares();
  reset();
}

function setupSquares() {
  for (let i = 0; i < numSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.addEventListener("click", function () {
      const clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "✅ Correct!";
        changeColors(clickedColor);
        h1.style.backgroundColor = pickedColor;
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "❌ Try Again!";
      }
    });
    squaresContainer.appendChild(square);
  }
}

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor.toUpperCase();
  const squares = document.querySelectorAll(".square");
  squares.forEach((sq, i) => {
    sq.style.display = "block";
    sq.style.backgroundColor = colors[i];
  });
  h1.style.backgroundColor = "steelblue";
  messageDisplay.textContent = "";
}

resetButton.addEventListener("click", reset);

function changeColors(color) {
  const squares = document.querySelectorAll(".square");
  squares.forEach(sq => (sq.style.backgroundColor = color));
}

function pickColor() {
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
