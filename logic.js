// Select Elements
const passwordField = document.getElementById("password");
const copyIcon = document.getElementById("copyIcon");
const generateBtn = document.getElementById("generateBtn");
const lengthInput = document.getElementById("length");

// Character sets
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
const allChars = uppercase + lowercase + numbers + symbols;

// Function to create password
function createPassword() {
  const length = parseInt(lengthInput.value) || 12;
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomChar = allChars[Math.floor(Math.random() * allChars.length)];
    password += randomChar;
  }

  passwordField.value = password;
}

// Copy to clipboard function
copyIcon.addEventListener("click", () => {
  if (passwordField.value) {
    navigator.clipboard.writeText(passwordField.value);
    alert("✅ Password copied to clipboard!");
  } else {
    alert("⚠️ No password to copy!");
  }
});

// Generate button event
generateBtn.addEventListener("click", createPassword);
