function validatePassword() {
    var password = document.getElementById('password').value;
    var message = document.getElementById('message');

    var lowerCase = /[a-z]/.test(password);
    var upperCase = /[A-Z]/.test(password);
    var numeric = /[0-9]/.test(password);
    var specialChar = /[!@#$%^&*(),.?"'\:{}|<>]/.test(password);
    var minLength = password.length >= 8;

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
    var message = document.getElementById('message');
    if (lowerCase && upperCase && numeric && specialChar && minLength) {
        message.style.color = 'lightgreen';
        message.innerHTML = 'Strong password!';
    } else {
        message.style.color = '#ffeb3b';
        message.innerHTML = '⚠️ Keep typing to meet all requirements.';
    }
}
