import java.util.Scanner;

public class question_2 {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String s = sc.nextLine();
    System.out.println(check(s));
  }

  public static boolean check(String s) {
    String cleanStr = s.toLowerCase().replaceAll("[^a-z0-9]", "");

    int left = 0;
    int right = cleanStr.length() - 1;

    while (left < right) {
      if (cleanStr.charAt(left) != cleanStr.charAt(right)) {
        return false;
      }
      left++;
      right--;
    }

    return true;
  }
}
