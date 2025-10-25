import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Comparator;
import java.util.List;
import java.util.Scanner;

public class CSVActions {
    // 1. Create CSV File
    public static  void CreateCSVFile(String CsvFilePath) throws IOException {
        File file = new File(CsvFilePath);
        if(file.createNewFile()){
            System.out.println("File Created... "+CsvFilePath);
        }else {
            System.out.println("File Already Exist.. "+CsvFilePath);
        }
//        // Write Sample Data
//        FileWriter writer = new FileWriter(CsvFilePath);
//        writer.write("Name, Age, City\n");
//        writer.write("Gaurav, 25, New York\n");
//        writer.write("Mannu, 30, London\n");
//        writer.close();
//        System.out.println("Data written to file successfully...");

    }
    // Read CSV File
    public static void ReadCsvFile(String CsvFilePath) throws FileNotFoundException {
        File file = new File(CsvFilePath);
        Scanner scanner = new Scanner(file);
        scanner.useDelimiter(",");
        while(scanner.hasNext()){
            System.out.print(scanner.next()+"\t");
        }
        scanner.close();
    }
    // Write to CSV File
    public static void WriteToCsvFile(String csvFilePath, String data) throws IOException {
        try (FileWriter writer = new FileWriter(csvFilePath, true)) {
            writer.append(data).append("\n");
            System.out.println("Row added: " + data);
        }
    }
    public static void SearchInCsvFile(String csvFilePath, String keyword) throws FileNotFoundException {
        try (Scanner scanner = new Scanner(new File(csvFilePath))) {
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                if (line.toLowerCase().contains(keyword.toLowerCase())) {
                    System.out.println("Found: " + line);
                    return;
                }
            }
            System.out.println("No record found for: " + keyword);
        }
    }
    public static void UpdateCsvRecord(String csvFilePath, String oldValue, String newValue) throws IOException {
        File file = new File(csvFilePath);
        StringBuilder content = new StringBuilder();

        try (Scanner scanner = new Scanner(file)) {
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                content.append(line.replace(oldValue, newValue)).append("\n");
            }
        }

        try (FileWriter writer = new FileWriter(file)) {
            writer.write(content.toString());
        }

        System.out.println("Updated all '" + oldValue + "' to '" + newValue + "'");
    }
    public static void DeleteCsvRecord(String csvFilePath, String keyword) throws IOException {
        File inputFile = new File(csvFilePath);
        StringBuilder newContent = new StringBuilder();

        try (Scanner scanner = new Scanner(inputFile)) {
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                if (!line.contains(keyword)) {
                    newContent.append(line).append("\n");
                }
            }
        }

        try (FileWriter writer = new FileWriter(inputFile)) {
            writer.write(newContent.toString());
        }

        System.out.println("Deleted records containing: " + keyword);
    }
    public static void CountCsvRecords(String csvFilePath) throws FileNotFoundException {
        int count = 0;
        try (Scanner scanner = new Scanner(new File(csvFilePath))) {
            while (scanner.hasNextLine()) {
                scanner.nextLine();
                count++;
            }
        }
        System.out.println("Total rows (including header): " + count);
    }
    public static void GetCsvHeaders(String csvFilePath) throws IOException {
        try (Scanner scanner = new Scanner(new File(csvFilePath))) {
            if (scanner.hasNextLine()) {
                System.out.println("Header: " + scanner.nextLine());
            }
        }
    }
    public static void DisplayCsvAsTable(String csvFilePath) throws FileNotFoundException {
        try (Scanner scanner = new Scanner(new File(csvFilePath))) {
            scanner.useDelimiter("[,\n]");
            int col = 0;
            while (scanner.hasNext()) {
                System.out.printf("%-15s", scanner.next());
                col++;
                if (col == 3) {  // 3 columns
                    System.out.println();
                    col = 0;
                }
            }
        }
    }


    public static void BackupCsvFile(String csvFilePath, String backupPath) throws IOException {
        Path src = Paths.get(csvFilePath);
        Path dest = Paths.get(backupPath);
        Files.copy(src, dest, StandardCopyOption.REPLACE_EXISTING);
        System.out.println("Backup created at: " + backupPath);
    }


    public static void SortCsvByColumn(String csvFilePath, int columnIndex) throws IOException {
        List<String> lines = Files.readAllLines(Paths.get(csvFilePath));
        String header = lines.remove(0);

        lines.sort(Comparator.comparing(line -> line.split(",")[columnIndex]));
        lines.add(0, header);

        Files.write(Paths.get(csvFilePath), lines);
        System.out.println("CSV sorted by column index: " + columnIndex);
    }
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);
        String filePath = "/Users/mannu/Desktop/FileHandling/MyFiles/User.csv";
        String backupPath = "/Users/mannu/Desktop/FileHandling/MyFiles/Backup/User_Backup.csv";
        while (true) {
            System.out.println("\n========== CSV FILE MANAGEMENT ==========");
            System.out.println("1. Create CSV File");
            System.out.println("2. Write to CSV File");
            System.out.println("3. Read CSV File");
            System.out.println("4. Search in CSV File");
            System.out.println("5. Update CSV Record");
            System.out.println("6. Delete CSV Record");
            System.out.println("7. Count CSV Records");
            System.out.println("8. Get CSV Headers");
            System.out.println("9. Display CSV as Table");
            System.out.println("10. Backup CSV File");
            System.out.println("11. Sort CSV by Column");
            System.out.println("12. Exit");
            System.out.print("Enter your choice: ");
            int choice = sc.nextInt();
            sc.nextLine(); // consume newline

            switch (choice) {
                case 1:
                    CSVActions.CreateCSVFile(filePath);
                    break;

                case 2:
                    System.out.print("Enter Name: ");
                    String name = sc.nextLine();
                    System.out.print("Enter Age: ");
                    String age = sc.nextLine();
                    System.out.print("Enter City: ");
                    String city = sc.nextLine();
                    String data = name + "," + age + "," + city;
                    CSVActions.WriteToCsvFile(filePath, data);
                    break;

                case 3:
                    CSVActions.ReadCsvFile(filePath);
                    break;

                case 4:
                    System.out.print("Enter keyword to search: ");
                    String keyword = sc.nextLine();
                    CSVActions.SearchInCsvFile(filePath, keyword);
                    break;

                case 5:
                    System.out.print("Enter old value: ");
                    String oldValue = sc.nextLine();
                    System.out.print("Enter new value: ");
                    String newValue = sc.nextLine();
                    CSVActions.UpdateCsvRecord(filePath, oldValue, newValue);
                    break;

                case 6:
                    System.out.print("Enter keyword to delete: ");
                    String keyToDelete = sc.nextLine();
                    CSVActions.DeleteCsvRecord(filePath, keyToDelete);
                    break;

                case 7:
                    CSVActions.CountCsvRecords(filePath);
                    break;

                case 8:
                    CSVActions.GetCsvHeaders(filePath);
                    break;

                case 9:
                    CSVActions.DisplayCsvAsTable(filePath);
                    break;

                case 10:
                    CSVActions.BackupCsvFile(filePath, backupPath);
                    break;

                case 11:
                    System.out.print("Enter column index (0 for Name, 1 for Age, 2 for City): ");
                    int colIndex = sc.nextInt();
                    CSVActions.SortCsvByColumn(filePath, colIndex);
                    break;

                case 12:
                    System.out.println("Exiting... 👋");
                    sc.close();
                    System.exit(0);
                    break;

                default:
                    System.out.println("❌ Invalid choice! Please try again.");
            }

        }
    }
}
