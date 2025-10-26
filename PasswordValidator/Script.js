document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('validateBtn').addEventListener('click', validatePassword);

function validatePassword() {
  const password = document.getElementById('password').value;
  const message = document.getElementById('message');

  const checks = {
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    length: password.length >= 8
  };

  for (const [key, passed] of Object.entries(checks)) {
    const element = document.getElementById(key);
    element.textContent = passed ? "✅" : "❌";
    element.className = passed ? "valid" : "invalid";
  }

  if (Object.values(checks).every(Boolean)) {
    message.style.color = "lightgreen";
    message.textContent = "✅ Strong password!";
  } else if (password.length === 0) {
    message.style.color = "#ff4d4d";
    message.textContent = "Please enter a password.";
  } else {
    message.style.color = "#ffeb3b";
    message.textContent = "⚠️ Keep typing to meet all requirements.";
  }
}
