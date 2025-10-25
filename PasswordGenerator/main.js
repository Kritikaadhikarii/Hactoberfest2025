function generatePassword() {
  const length = document.getElementById('length').value;
  const useUpper = document.getElementById('uppercase').checked;
  const useLower = document.getElementById('lowercase').checked;
  const useNumbers = document.getElementById('numbers').checked;
  const useSymbols = document.getElementById('symbols').checked;

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+{}[]|<>?";

  let characters = "";
  if (useUpper) characters += upper;
  if (useLower) characters += lower;
  if (useNumbers) characters += numbers;
  if (useSymbols) characters += symbols;

  let password = "";
  if (characters.length === 0) {
    alert("Select at least one option.");
    return;
  }

  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * characters.length);
    password += characters[random];
  }

  document.getElementById('password').value = password;
}

function Password() {
  const password = document.getElementById('password');
  password.select();
  document.execCommand("copy");
  alert("Password copied to clipboard!");
}
