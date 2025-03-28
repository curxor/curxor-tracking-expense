// import { test, expect } from "@playwright/test";
//#region
// import { test, expect } from "@playwright/test";

// test.describe("Authentication Flow", () => {
//   // Test 1: Kiểm tra quá trình đăng nhập
//   test("should sign in successfully", async ({ page }) => {
//     await page.goto("http://localhost:8082");

//     // Điền email và click nút Sign In
//     await page.fill('input[placeholder="Email"]', "ngoc@example.com");
//     await page.click("text=Sign In");

//     // Kiểm tra thông báo đăng nhập thành công
//     // const toast = await page.locator('text="Sign in successful"').isVisible();
//     // expect(toast).toBeTruthy();
//   });

//   // Test 2: Kiểm tra điều hướng sau khi đăng nhập
//   test("should redirect to verify after sign in", async ({ page }) => {
//     // Giả lập trạng thái đã đăng nhập (nếu được hỗ trợ)
//     await page.goto("http://localhost:8082/sign-in");

//     // Kiểm tra điều hướng URL
//     await expect(page).toHaveURL(/\/verify\?email=test@example\.com/, {
//       timeout: 10000,
//     });
//   });
// });
//#endregion
import { test, expect } from "@playwright/test";
test.use({
  headless: false, // Chạy trong chế độ có giao diện
});
test.describe("Sign-In Screen", () => {
  test("Nhập email hợp lệ", async ({ page }) => {
    // Mở màn hình Sign-In
    await page.goto("http://localhost:8081/sign-in");
    await page.pause();
    // Kiểm tra tiêu đề màn hình có hiển thị đúng không
    const title = await page.locator('text="Curxor Tracking 🌊"').isVisible();
    expect(title).toBeTruthy();

    // Kiểm tra phần input email có tồn tại không
    const emailInput = await page.locator('input[placeholder="Email"]');
    expect(await emailInput.isVisible()).toBeTruthy();

    // Nhập email hợp lệ
    await emailInput.fill("ngoc@example.com");
    expect(await emailInput.inputValue()).toBe("ngoc@example.com");
    await page.pause();
    // Kiểm tra nút Sign In hiển thị và có thể click
    const signInButton = await page.locator('text="Sign In"');
    // expect(await signInButton.isVisible()).toBeTruthy();
    await signInButton.click();
    // await expect(page).toHaveURL(/\/verify-otp/);
  });
});
