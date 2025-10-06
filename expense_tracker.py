import json
import os
from datetime import datetime

DATA_FILE = "expenses.json"

def load_data():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)

def add_transaction(tx_type, amount, category, note=""):
    data = load_data()
    data.append({
        "type": tx_type,  # "income" or "expense"
        "amount": amount,
        "category": category,
        "note": note,
        "date": datetime.now().isoformat()
    })
    save_data(data)
    print("Transaction added.")

def view_summary():
    data = load_data()
    total_income = sum(tx["amount"] for tx in data if tx["type"] == "income")
    total_expense = sum(tx["amount"] for tx in data if tx["type"] == "expense")
    balance = total_income - total_expense
    print(f"Total Income: {total_income}")
    print(f"Total Expense: {total_expense}")
    print(f"Balance: {balance}")

def list_transactions():
    data = load_data()
    if not data:
        print("No transactions found.")
        return
    for idx, tx in enumerate(data, start=1):
        print(f"{idx}. [{tx['type']}] {tx['amount']} in {tx['category']} — {tx.get('note', '')} on {tx['date']}")

def menu():
    while True:
        print("\nExpense Tracker")
        print("1. Add Income")
        print("2. Add Expense")
        print("3. View Summary")
        print("4. List Transactions")
        print("0. Exit")

        choice = input("Select option: ")
        if choice == "1":
            amt = float(input("Amount: "))
            cat = input("Category: ")
            note = input("Note (optional): ")
            add_transaction("income", amt, cat, note)
        elif choice == "2":
            amt = float(input("Amount: "))
            cat = input("Category: ")
            note = input("Note (optional): ")
            add_transaction("expense", amt, cat, note)
        elif choice == "3":
            view_summary()
        elif choice == "4":
            list_transactions()
        elif choice == "0":
            break
        else:
            print("Invalid option, try again.")

if __name__ == "__main__":
    # starts the flow from here!
    menu()
