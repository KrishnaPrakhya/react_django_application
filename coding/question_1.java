import java.util.Arrays;
import java.util.Scanner;

public class question_1 {

  public static int check(int nums[], int index, int prev, Integer[][] dp) {
    if (index >= nums.length)
      return 0;

    if (dp[index][prev + 1] != null)
      return dp[index][prev + 1];

    int max = 0;

    if (prev == -1 || nums[index] > nums[prev]) {
      max = 1 + check(nums, index + 1, index, dp);
    }

    int skip = check(nums, index + 1, prev, dp);

    dp[index][prev + 1] = Math.max(skip, max);
    return dp[index][prev + 1];
  }

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int nums[] = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
    Integer dp[][] = new Integer[nums.length][nums.length + 1];
    System.out.println(check(nums, 0, -1, dp));
  }
}