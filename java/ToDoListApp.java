/*
 * Author: Sohum Seth
 * GitHub: https://github.com/sohumseth703
 * Program: Simple To-Do List App
 * Description: A console-based Java app to manage tasks (add, view, delete).
 */

import java.util.ArrayList;
import java.util.Scanner;

public class ToDoListApp {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<String> tasks = new ArrayList<>();
        int choice;

        System.out.println("Welcome to Sohum's Simple To-Do List App!");

        do {
            System.out.println("\nMenu:");
            System.out.println("1. Add Task");
            System.out.println("2. View Tasks");
            System.out.println("3. Delete Task");
            System.out.println("4. Exit");
            System.out.print("Enter your choice: ");
            
            while (!sc.hasNextInt()) {
                System.out.println("Invalid input! Enter a number between 1-4.");
                sc.next();
            }
            choice = sc.nextInt();
            sc.nextLine(); // consume newline

            switch (choice) {
                case 1:
                    System.out.print("Enter task: ");
                    String task = sc.nextLine();
                    tasks.add(task);
                    System.out.println("Task added!");
                    break;

                case 2:
                    if (tasks.isEmpty()) {
                        System.out.println("No tasks found.");
                    } else {
                        System.out.println("Your Tasks:");
                        for (int i = 0; i < tasks.size(); i++) {
                            System.out.println((i + 1) + ". " + tasks.get(i));
                        }
                    }
                    break;

                case 3:
                    if (tasks.isEmpty()) {
                        System.out.println("No tasks to delete.");
                    } else {
                        System.out.print("Enter task number to delete: ");
                        while (!sc.hasNextInt()) {
                            System.out.println("Invalid input! Enter a valid task number.");
                            sc.next();
                        }
                        int taskNum = sc.nextInt();
                        sc.nextLine();
                        if (taskNum > 0 && taskNum <= tasks.size()) {
                            String removed = tasks.remove(taskNum - 1);
                            System.out.println("Removed task: " + removed);
                        } else {
                            System.out.println("Invalid task number!");
                        }
                    }
                    break;

                case 4:
                    System.out.println("Exiting. Goodbye!");
                    break;

                default:
                    System.out.println("Please enter a valid choice (1-4).");
            }

        } while (choice != 4);

        sc.close();
    }
}
