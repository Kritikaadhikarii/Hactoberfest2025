// Function to clear the display
function clearDisplay() {
    document.querySelector('[name="display"]').value = '';
    adjustFontSize();
}

// Function to delete the last character in the display
function deleteLastCharacter() {
    const display = document.querySelector('[name="display"]');
    display.value = display.value.toString().slice(0, -1);
    adjustFontSize();
}

// Function to adjust font size based on input length
function adjustFontSize() {
    const display = document.querySelector('[name="display"]');
    const length = display.value.length;

    if (length > 20) {
        display.style.fontSize = '20px';
    } else if (length > 15) {
        display.style.fontSize = '25px';
    } else if (length > 10) {
        display.style.fontSize = '30px';
    } else if (length > 5) {
        display.style.fontSize = '35px';
    } else {
        display.style.fontSize = '45px';
    }
}

// Function to append a character to the display
function appendCharacter(character) {
    const display = document.querySelector('[name="display"]');
    const lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/','x','%'];

    // Clear the display if it shows 'Error'
    if (display.value === 'Error' || display.value === 'undefined') {
        clearDisplay();
    }

    // Prevent starting with an operator other than a minus for negative numbers
    if (display.value === '' && operators.includes(character) && character !== '-' && character != '.') {
        return;
    }

    // If display contains only '-' or '.', clear it if an operator is added
    if ((display.value === '-' || display.value === '.') && operators.includes(character)) {
        clearDisplay();
        return;
    }

    // Prevent multiple decimal points in a single number
    if (character === '.') {
        const parts = display.value.split(/[\+\-\*\/x%]/);
        const currentPart = parts[parts.length - 1];
        if (currentPart.includes('.')) {
            return;
        }
    }

    // Replace the last operator with the new one if the last character is an operator
    if ( operators.includes(lastChar) && operators.includes(character)) {
        display.value = display.value.slice(0, -1) + character;
    } else {
        display.value += character;
    }

    adjustFontSize();
}

// Function to validate the expression
function isValidExpression(expression) {
    const operators = ['+', '-', '*', '/','x','%'];

    // Check if the last character is an operator
    if (operators.includes(expression.slice(-1))) {
        return false;
    }

    // Check for invalid operator sequences
    for (let i = 0; i < expression.length - 1; i++) {
        if (operators.includes(expression[i]) && operators.includes(expression[i + 1])) {
            return false;
        }
    }
    return true;
}

// Function to calculate the expression in the display
function calculateResult() {
    const display = document.querySelector('[name="display"]');
    let expression = display.value.replace(/x/g, '*'); // Replace 'x' with '*'

    // To prevent '=' to show undefined if nothing is typed
    if (expression.trim() === "") {
        display.value = "";
        return;
    }

    if (isValidExpression(expression)) {
        try {
            display.value = eval(expression);
        } catch (e) {
            display.value = 'Error';
        }
    } else {
        display.value = 'Error';
    }

    adjustFontSize();
}

// Event listeners for buttons
document.querySelectorAll('input[type="button"]').forEach(button => {
    button.addEventListener('click', function () {
        const value = this.value;

        if (value === 'AC') {
            clearDisplay();
        } else if (value === 'DE') {
            deleteLastCharacter();
        } else if (value === '=') {
            calculateResult();
        } else {
            appendCharacter(value);
        }
    });
});