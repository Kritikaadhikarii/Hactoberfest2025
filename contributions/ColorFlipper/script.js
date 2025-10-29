const btn = document.getElementById("btn");
const color = document.getElementById("color");

btn.addEventListener("click", () => {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = randomColor;
  color.textContent = randomColor;
});
