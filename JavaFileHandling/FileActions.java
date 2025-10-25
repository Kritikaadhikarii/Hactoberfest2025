import java.io.*;
import java.nio.file.*;
import java.util.Scanner;

public class FileActions {

    // 1.Create a File
    public static String CreateFile(String filePath) throws IOException {
        File file = new File(filePath);
        return file.createNewFile() ? "File Created: " + filePath : " File Already Exists.";
    }

    // 2.Check if File Exists
    public static String FileExistOrNot(String filePath) {
        File file = new File(filePath);
        return file.exists() ? "File Exists: " + filePath : " File Not Found.";
    }

    // 3.Write to File (overwrite)
    public static void WriteFile(String filePath) throws IOException {
        try (FileWriter fw = new FileWriter(filePath)) {
            fw.write("Welcome to Java File Handling!\nThis file was written using FileWriter.");
            System.out.println("File written successfully.");
        }
    }

    // 4.Append to File (add content without overwriting)
    public static void AppendToFile(String filePath, String data) throws IOException {
        try (FileWriter fw = new FileWriter(filePath, true)) {
            fw.write(data + "\n");
            System.out.println("Appended data: " + data);
        }
    }

    // 5.Read File (using Scanner)
    public static void ReadFile(String filePath) throws FileNotFoundException {
        try (Scanner sc = new Scanner(new File(filePath))) {
            while (sc.hasNextLine()) {
                System.out.println(sc.nextLine());
            }
        }
    }

    // 6.Read File Using BufferedReader (efficient)
    public static void ReadFileByBuffer(String filePath) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        }
    }

    // 7.Rename File
    public static String RenameFile(String oldPath, String newPath) {
        File oldFile = new File(oldPath);
        File newFile = new File(newPath);
        return oldFile.renameTo(newFile) ? " File Renamed Successfully." : " Rename Failed.";
    }

    // 8.Delete File
    public static String DeleteFile(String filePath) {
        File file = new File(filePath);
        return file.delete() ? "🗑️ File Deleted Successfully." : "Delete Failed.";
    }

    // 9.Copy File
    public static void CopyFile(String sourcePath, String destPath) throws IOException {
        Files.copy(Paths.get(sourcePath), Paths.get(destPath), StandardCopyOption.REPLACE_EXISTING);
        System.out.println(" File Copied Successfully!");
    }

    // 10.Move File
    public static void MoveFile(String sourcePath, String destPath) throws IOException {
        Files.move(Paths.get(sourcePath), Paths.get(destPath), StandardCopyOption.REPLACE_EXISTING);
        System.out.println(" File Moved Successfully!");
    }

    // 11. Count Lines in File
    public static void CountFileLines(String filePath) throws IOException {
        int count = 0;
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            while (br.readLine() != null) count++;
        }
        System.out.println(" Total Lines: " + count);
    }

    // 12. Get File Details (Metadata)
    public static void GetFileDetails(String filePath) {
        File file = new File(filePath);
        if (file.exists()) {
            System.out.println(" File Details:");
            System.out.println("Name: " + file.getName());
            System.out.println("Path: " + file.getAbsolutePath());
            System.out.println("Size: " + file.length() + " bytes");
            System.out.println("Readable: " + file.canRead());
            System.out.println("Writable: " + file.canWrite());
            System.out.println("Executable: " + file.canExecute());
            System.out.println("Last Modified: " + file.lastModified());
        } else {
            System.out.println(" File not found!");
        }
    }

    // 13. List Files in Directory
    public static void ListFilesInDirectory(String folderPath) {
        File folder = new File(folderPath);
        File[] files = folder.listFiles();
        if (files != null) {
            System.out.println(" Files in Directory:");
            for (File f : files) {
                System.out.println((f.isDirectory() ? "[DIR] " : "[FILE] ") + f.getName());
            }
        } else {
            System.out.println(" Directory not found!");
        }
    }

    // 14. Write Multiple Lines
    public static void WriteMultipleLines(String filePath, String[] lines) throws IOException {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(filePath))) {
            for (String line : lines) {
                bw.write(line);
                bw.newLine();
            }
        }
        System.out.println(" Multiple lines written successfully!");
    }

    // 15. File Permissions
    public static void FilePermissions(String filePath) {
        File file = new File(filePath);
        if (file.exists()) {
            System.out.println(" File Permissions:");
            System.out.println("Readable: " + file.canRead());
            System.out.println("Writable: " + file.canWrite());
            System.out.println("Executable: " + file.canExecute());
        } else {
            System.out.println("File not found!");
        }
    }

    // 16. Replace Word in File
    public static void ReplaceWordInFile(String filePath, String oldWord, String newWord) throws IOException {
        File file = new File(filePath);
        StringBuilder content = new StringBuilder();

        try (Scanner sc = new Scanner(file)) {
            while (sc.hasNextLine()) {
                content.append(sc.nextLine().replace(oldWord, newWord)).append("\n");
            }
        }

        try (FileWriter writer = new FileWriter(file)) {
            writer.write(content.toString());
        }

        System.out.println("Replaced '" + oldWord + "' with '" + newWord + "' successfully!");
    }

    // 17. Delete Directory Recursively
    public static void DeleteDirectory(String folderPath) {
        File folder = new File(folderPath);
        if (folder.isDirectory()) {
            for (File sub : folder.listFiles()) {
                if (sub.isDirectory()) DeleteDirectory(sub.getAbsolutePath());
                else sub.delete();
            }
        }
        folder.delete();
        System.out.println("Directory deleted: " + folderPath);
    }

    // 18. Search Word in File
    public static void SearchWordInFile(String filePath, String keyword) throws FileNotFoundException {
        File file = new File(filePath);
        int lineNumber = 1;
        try (Scanner sc = new Scanner(file)) {
            boolean found = false;
            while (sc.hasNextLine()) {
                String line = sc.nextLine();
                if (line.toLowerCase().contains(keyword.toLowerCase())) {
                    System.out.println(" Found '" + keyword + "' at line " + lineNumber + ": " + line);
                    found = true;
                }
                lineNumber++;
            }
            if (!found) System.out.println("Word not found: " + keyword);
        }
    }

    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);
        String baseFolder = "/Users/mannu/Desktop/FileHandling/MyFiles/";
        String filePath = baseFolder + "User.txt";
        String newFilePath = baseFolder + "User_Renamed.txt";
        String backupPath = baseFolder + "Backup/User_Backup.txt";
        String movedPath = baseFolder + "Moved/User_Moved.txt";

        System.out.println(" FILE HANDLING MANAGER STARTED SUCCESSFULLY!");

        while (true) {
            System.out.println("\n========== FILE HANDLING MENU ==========");
            System.out.println("1. Create File");
            System.out.println("2. Check if File Exists");
            System.out.println("3. Write to File");
            System.out.println("4. Append to File");
            System.out.println("5. Read File");
            System.out.println("6. Rename File");
            System.out.println("7. Get File Details");
            System.out.println("8. Count File Lines");
            System.out.println("9. Replace Word in File");
            System.out.println("10. Search Word in File");
            System.out.println("11. Check File Permissions");
            System.out.println("12. Copy File");
            System.out.println("13. Move File");
            System.out.println("14. List Files in Directory");
            System.out.println("15. Write Multiple Lines");
            System.out.println("16. Exit");
            System.out.print("\n Enter your choice: ");

            int choice;
            if (sc.hasNextInt()) {
                choice = sc.nextInt();
            } else {
                System.out.println(" Please enter a valid number!");
                sc.nextLine();
                continue;
            }
            sc.nextLine(); // consume newline

            try {
                switch (choice) {
                    case 1:
                        System.out.println(FileActions.CreateFile(filePath));
                        break;

                    case 2:
                        System.out.println(FileActions.FileExistOrNot(filePath));
                        break;

                    case 3:
                        FileActions.WriteFile(filePath);
                        break;

                    case 4:
                        System.out.print("Enter text to append: ");
                        String appendData = sc.nextLine();
                        FileActions.AppendToFile(filePath, appendData);
                        break;

                    case 5:
                        System.out.println("\n📖 Reading File:");
                        FileActions.ReadFile(filePath);
                        break;

                    case 6:
                        System.out.println(FileActions.RenameFile(filePath, newFilePath));
                        break;

                    case 7:
                        System.out.println("\n📄 File Details:");
                        FileActions.GetFileDetails(newFilePath);
                        break;

                    case 8:
                        FileActions.CountFileLines(newFilePath);
                        break;

                    case 9:
                        System.out.print("Enter old word: ");
                        String oldWord = sc.nextLine();
                        System.out.print("Enter new word: ");
                        String newWord = sc.nextLine();
                        FileActions.ReplaceWordInFile(newFilePath, oldWord, newWord);
                        break;

                    case 10:
                        System.out.print("Enter word to search: ");
                        String keyword = sc.nextLine();
                        FileActions.SearchWordInFile(newFilePath, keyword);
                        break;

                    case 11:
                        FileActions.FilePermissions(newFilePath);
                        break;

                    case 12:
                        FileActions.CopyFile(newFilePath, backupPath);
                        break;

                    case 13:
                        FileActions.MoveFile(newFilePath, movedPath);
                        break;

                    case 14:
                        System.out.println("\n📂 Files in Directory:");
                        FileActions.ListFilesInDirectory(baseFolder);
                        break;

                    case 15:
                        System.out.println("Enter number of lines to write: ");
                        int n = sc.nextInt();
                        sc.nextLine();
                        String[] lines = new String[n];
                        for (int i = 0; i < n; i++) {
                            System.out.print("Line " + (i + 1) + ": ");
                            lines[i] = sc.nextLine();
                        }
                        FileActions.WriteMultipleLines(baseFolder + "MultiLine.txt", lines);
                        break;

                    case 16:
                        System.out.println("\n👋 Exiting File Manager... Goodbye!");
                        sc.close();
                        System.exit(0);
                        break;

                    default:
                        System.out.println("Invalid choice! Please try again.");
                }
            } catch (Exception e) {
                System.out.println(" Error: " + e.getMessage());
            }

        }
    }
}