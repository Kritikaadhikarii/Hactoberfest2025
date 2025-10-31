const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

// Dummy form validation
document.getElementById('signupForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Account created successfully!');
});

document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Login successful!');
});
