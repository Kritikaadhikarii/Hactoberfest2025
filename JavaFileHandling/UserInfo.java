import java.io.*;
import java.util.Scanner;

public class UserInfo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String fileName = "user_info.txt";

        // Step 1: Take username and store it
        System.out.print("Enter your name to store in file or press Enter to skip: ");
        String userName = scanner.nextLine();

        if (!userName.isEmpty()) {
            try (FileWriter writer = new FileWriter(fileName, true)) {
                writer.write(userName + "\n");
                System.out.println("Name saved successfully!");
            } catch (IOException e) {
                System.out.println("Error writing to file: " + e.getMessage());
            }
        }

        // Step 2: Ask if user wants to display all names
        System.out.print("Do you want to see all user names? (y/n): ");
        String showInfo = scanner.nextLine();

        if (showInfo.equalsIgnoreCase("y")) {
            try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
                System.out.println("\n📋 Saved User Names:");
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line.trim());
                }
            } catch (IOException e) {
                System.out.println("Error reading file: " + e.getMessage());
            }
        }

        scanner.close();
    }
}