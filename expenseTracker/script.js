// Get DOM elements
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const addButton = document.getElementById('addEntry');
const entryList = document.getElementById('entryList');
const balanceDisplay = document.getElementById('balance');

// Retrieve existing entries from localStorage or initialize empty array
let entries = JSON.parse(localStorage.getItem('entries')) || [];

// Function to update the balance
function updateBalance() {
    const total = entries.reduce((acc, entry) => acc + entry.amount, 0);
    balanceDisplay.textContent = total.toFixed(2);
}

// Function to render the entries list
function renderEntries() {
    entryList.innerHTML = ''; // Clear current list
    entries.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${entry.description}: $${entry.amount.toFixed(2)}
            <button class="delete" onclick="deleteEntry(${index})">Delete</button>
        `;
        entryList.appendChild(li);
    });
}

// Function to add a new entry
function addEntry() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());

    if (!description || isNaN(amount)) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const newEntry = { description, amount };
    entries.push(newEntry);
    localStorage.setItem('entries', JSON.stringify(entries));

    // Clear inputs and update UI
    descriptionInput.value = '';
    amountInput.value = '';
    renderEntries();
    updateBalance();
}

// Function to delete an entry
function deleteEntry(index) {
    entries.splice(index, 1);
    localStorage.setItem('entries', JSON.stringify(entries));
    renderEntries();
    updateBalance();
}

// Event listener for the "Add Entry" button
addButton.addEventListener('click', addEntry);

// Initial render
renderEntries();
updateBalance();
