import json
import os

DATA_FILE = "data.json"

def load_data():
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, "r") as file:
        return json.load(file)

def save_data(data):
    with open(DATA_FILE, "w") as file:
        json.dump(data, file, indent=4)

def add_habit(data):
    habit = input("Enter new habit: ").strip()
    if habit in data:
        print("⚠️ Habit already exists!")
    else:
        data[habit] = {"completed": False}
        print(f"✅ Habit '{habit}' added!")
    save_data(data)

def mark_completed(data):
    habit = input("Enter habit to mark as completed: ").strip()
    if habit in data:
        data[habit]["completed"] = True
        print(f"🎯 '{habit}' marked as completed!")
    else:
        print("❌ Habit not found!")
    save_data(data)

def view_habits(data):
    if not data:
        print("📭 No habits added yet!")
        return
    print("\n📋 Your Habits:")
    for habit, info in data.items():
        status = "✅ Done" if info["completed"] else "❌ Not Done"
        print(f"- {habit}: {status}")

def delete_habit(data):
    habit = input("Enter habit to delete: ").strip()
    if habit in data:
        del data[habit]
        print(f"🗑 '{habit}' deleted.")
    else:
        print("❌ Habit not found.")
    save_data(data)

def main():
    data = load_data()
    while True:
        print("\n=== 🌱 Habit Tracker ===")
        print("1. Add Habit")
        print("2. Mark Habit as Completed")
        print("3. View All Habits")
        print("4. Delete Habit")
        print("5. Exit")
        
        choice = input("Choose an option: ")
        
        if choice == "1":
            add_habit(data)
        elif choice == "2":
            mark_completed(data)
        elif choice == "3":
            view_habits(data)
        elif choice == "4":
            delete_habit(data)
        elif choice == "5":
            print("👋 Exiting Habit Tracker. Stay consistent!")
            break
        else:
            print("❌ Invalid choice! Try again.")

if __name__ == "__main__":
    main()
