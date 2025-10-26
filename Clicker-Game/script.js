let score = 0;
const scoreDisplay = document.getElementById("score");
const clickBtn = document.getElementById("click-btn");

clickBtn.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;

  // Add a little animation on click
  clickBtn.style.transform = "scale(1.2)";
  setTimeout(() => (clickBtn.style.transform = "scale(1)"), 150);

  // Add glowing effect on every 10 clicks
  if (score % 10 === 0) {
    document.body.style.background = `linear-gradient(135deg, #a18cd1, #fbc2eb)`;
    setTimeout(() => {
      document.body.style.background = `linear-gradient(135deg, #ff9a9e, #fad0c4)`;
    }, 500);
  }
});
