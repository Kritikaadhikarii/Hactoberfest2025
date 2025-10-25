todo_list = []

def show_tasks():
    print("\nYour To-Do List:")
    if not todo_list:
        print("  (No tasks yet)")
    for i, task in enumerate(todo_list, 1):
        print(f"  {i}. {task}")

def add_task():
    task = input("Enter a task to add: ")
    todo_list.append(task)
    print(f'"{task}" added!')

def remove_task():
    show_tasks()
    num = int(input("Enter task number to remove: "))
    if 0 < num <= len(todo_list):
        removed = todo_list.pop(num-1)
        print(f'"{removed}" removed!')
    else:
        print("Invalid task number.")

def main():
    while True:
        print("\nChoose an option:")
        print("1. Show tasks")
        print("2. Add a task")
        print("3. Remove a task")
        print("4. Exit")
        choice = input("Enter your choice: ")

        if choice == "1":
            show_tasks()
        elif choice == "2":
            add_task()
        elif choice == "3":
            remove_task()
        elif choice == "4":
            print("Goodbye!")
            break
        else:
            print("Invalid choice, try again.")

if __name__ == "__main__":
    main()
