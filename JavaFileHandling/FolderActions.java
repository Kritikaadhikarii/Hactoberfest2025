import java.io.File;
import java.util.Scanner;

public class FolderActions {

    // 1. Create Folder
    public static void CreateFolder(String folderPath){
        File folder = new File(folderPath);
        if(!folder.exists()){
            folder.mkdir();
            System.out.println("Folder Created... "+folderPath);
        }
    }

   // 2. Check folder is Exist or Not
   public static String FolderExistOrNot(String folderPath){
       File folder = new File(folderPath);
       boolean exists = folder.exists();
       return exists ? "File Already exist.. "+folderPath: "File not exist..";
   }

   // 3. Update Folder Name
     public static String UpdateFolderName(String oldFolderPath,String newFolderPath){
        File oldFolder = new File(oldFolderPath);
        File newFolder = new File(newFolderPath);
        return oldFolder.exists()
                ? (oldFolder.renameTo(newFolder) ? "File name Renamed.. "+newFolderPath: "Rename Failed")
                : "File does Not Exist...";
     }

   // 4. Delete Folder
    public static String DeleteFolder(String folderPath){
        File folder = new File(folderPath);

        return folder.exists() ?
                (folder.delete() ? "File deleted Successfully.. "+folderPath: "Deletion Failed..!")
                : "Folder not Exist..";
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String baseFolder = "/Users/mannu/Desktop/FileHandling/";
        String folderPath = baseFolder + "MyFiles";
        String newFolderPath = baseFolder + "MyFiles_Renamed";

        System.out.println(" FOLDER HANDLING MANAGER STARTED SUCCESSFULLY!");
        while(true){
            System.out.println("\n========== FOLDER HANDLING MENU ==========");
            System.out.println("1. Create Folder");
            System.out.println("2. Check if Folder Exists");
            System.out.println("3. Raname Folder Name");
            System.out.println("4. Delete Folder Name");
            System.out.println("5. List Files in Directory");
            System.out.println("6. Delete Directory Recursively");
            System.out.println("7. Backup Directory");
            System.out.println("8. Exit");
            System.out.println("Welcome to FileHandling project!");
            System.out.print(" Enter your choice: ");

            int choice;
            if(sc.hasNextInt()){
                choice=sc.nextInt();
            }
            else{
                System.out.println("Invalid Choice! Please try again.");
                continue;
            }
            sc.nextLine();
            try{
                switch (choice){
                    case 1:
                        FolderActions.CreateFolder(folderPath);
                        break;
                    case 2:
                        System.out.println(FolderActions.FolderExistOrNot(folderPath));
                        break;
                    case 3:
                        System.out.println(FolderActions.UpdateFolderName(folderPath, newFolderPath));
                        break;
                    case 4:
                        System.out.println(FolderActions.DeleteFolder(folderPath));
                        break;
                    default:
                        System.out.println("Invalid Choice! Please try again.");
                        break;
                }

            } catch (Exception e) {
                throw new RuntimeException(e);
            }

        }

    }


}
