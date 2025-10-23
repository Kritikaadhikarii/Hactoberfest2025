const form = document.getElementById("skyForm");
const canvas = document.getElementById("skyCanvas");
const ctx = canvas.getContext("2d");
const text = document.getElementById("resultText");

canvas.width = window.innerWidth * 0.8;
canvas.height = 400;

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 2;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = document.getElementById("city").value;
  const date = document.getElementById("date").value;

  drawStars();
  text.textContent = `Your sky over ${city} on ${date}`;
});
