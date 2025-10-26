function validatePassword() {
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    // Check requirements
    const lowerCase = /[a-z]/.test(password);
    const upperCase = /[A-Z]/.test(password);
    const numeric = /[0-9]/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const minLength = password.length >= 8;

    // Update checklist dynamically
    document.getElementById("lower").innerHTML = lowerCase ? "✅" : "❌";
    document.getElementById("upper").innerHTML = upperCase ? "✅" : "❌";
    document.getElementById("number").innerHTML = numeric ? "✅" : "❌";
    document.getElementById("special").innerHTML = specialChar ? "✅" : "❌";
    document.getElementById("length").innerHTML = minLength ? "✅" : "❌";

    // Add color classes
    document.getElementById("lower").className = lowerCase ? "valid" : "invalid";
    document.getElementById("upper").className = upperCase ? "valid" : "invalid";
    document.getElementById("number").className = numeric ? "valid" : "invalid";
    document.getElementById("special").className = specialChar ? "valid" : "invalid";
    document.getElementById("length").className = minLength ? "valid" : "invalid";

    // Final status message
    if (lowerCase && upperCase && numeric && specialChar && minLength) {
        message.style.color = 'lightgreen';
        message.innerHTML = '✅ Strong password!';
    } else {
        message.style.color = '#ffeb3b';
        message.innerHTML = '⚠️ Keep typing to meet all requirements.';
    }
}
