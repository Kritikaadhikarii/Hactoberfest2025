let bulbs = [false, false, false];
let connections = [];

function generateSolvableConnections() {
  // Always solvable base setup
  const base = [
    [0],        // Switch 1 toggles bulb 0
    [1],        // Switch 2 toggles bulb 1
    [0, 1, 2]   // Switch 3 toggles all bulbs
  ];

  // Shuffle the switches for randomness
  connections = base.sort(() => Math.random() - 0.5);

  console.log("Connections:", connections);
}

function render() {
  bulbs.forEach((b, i) => {
    document.getElementById("b" + i).classList.toggle("on", b);
  });
}

function toggle(switchIndex) {
  for (let b of connections[switchIndex]) {
    bulbs[b] = !bulbs[b];
  }
  render();
  checkWin();
}

function checkWin() {
  if (bulbs.every(b => b)) {
    document.getElementById("msg").textContent = "🎉 You did it!";
  }
}

function resetGame() {
  bulbs = [false, false, false];
  document.getElementById("msg").textContent = "";
  generateSolvableConnections();
  render();
}

resetGame();
