function validatePassword() {
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");
  const errors = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number.");
  }
  if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character.");
  }

  if (errors.length > 0) {
    message.style.color = "red";
    message.innerHTML = errors.join("<br>");
  } else {
    message.style.color = "green";
    message.innerHTML = "Password is valid!";
  }
}

