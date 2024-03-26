package org.example;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("Welcome to Twitter Buildings Explorer!");
            System.out.println("Please choose an option:");
            System.out.println("1. Rectangular Tower");
            System.out.println("2. Triangular Tower");

            int choice = scanner.nextInt();
            switch (choice) {
                case 1:
                    rectangularTower(scanner);
                    break;
                case 2:
                    triangularTower(scanner);
                    break;
                default:
                    if (choice != 3) {
                        System.out.println("Invalid choice. Please choose again.");
                    }
            }

            if (choice == 3) {
                System.out.println("Exiting program. Goodbye!");
                return;
            }
        }
    }

    private static void rectangularTower(Scanner scanner) {
        System.out.println("Enter the height of the rectangular tower:");
        int height = scanner.nextInt();
        System.out.println("Enter the width of the rectangular tower:");
        int width = scanner.nextInt();


        if (Math.abs(height-width)>5) {
            System.out.println("The tower is a rectangle. Area: " + (height * width));
        } else {
            System.out.println("The tower is a square. Perimeter: " + 2 * (height + width));
        }
    }

    private static void triangularTower(Scanner scanner) {
        System.out.println("Enter the height of the triangular tower:");
        int height = scanner.nextInt();
        System.out.println("Enter the width of the triangular tower:");
        int width = scanner.nextInt();


        System.out.println("1. Calculate the perimeter of the triangle");
        System.out.println("2. Print the triangle");

        int option = scanner.nextInt();
        switch (option) {
            case 1:
                double hypotenuse = Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2));
                double perimeter = width + hypotenuse;
                System.out.println("Perimeter of the triangle: " + perimeter);
                break;
            case 2:
                if (width % 2 == 0 || width > 2 * height) {
                    System.out.println("The triangle cannot be printed.");
                    return;
                }
                printTriangle(height, width);
                break;
            default:
                System.out.println("Invalid option. Returning to main menu.");
        }
    }


    private static void printTriangle(int height, int width) {
        int groups, lines, LinesPerGroup, fstGroup,c ,space=width/2;

        c = (width == 1) ? 1 : 3;

        groups = (width<5) ? 1 : (width-3)/2;

        LinesPerGroup=(height-2)/groups;

        fstGroup=LinesPerGroup+(height-2)%groups;

        lines=fstGroup;

        for(int y=0;y<space;y++)
            System.out.print(" ");
        space--;
        System.out.print("*");
        System.out.println();



        for (int i = 0; i < groups; i++) {
            for (int j = 0; j < lines; j++) {
                for(int y = 0; y<space; y++)
                    System.out.print(" ");
                for (int n = 0; n < c; n++)
                    System.out.print("*");
                System.out.println();
            }
            space--;
            c += 2;
            lines=LinesPerGroup;
        }

        for (int j = 0; j < width; j++)
            System.out.print("*");
        System.out.println();
    }
}
