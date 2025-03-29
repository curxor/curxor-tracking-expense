// import { test, expect } from "@playwright/test";

// test.use({
//   headless: false, // Chạy trong chế độ có giao diện
// });

// test.describe("Sign-In and OTP Verification", () => {
//   test("Nhập email hợp lệ và xác thực OTP", async ({ page }) => {
//     // Mở màn hình Sign-In
//     await page.goto("http://localhost:8081/sign-in");

//     // Kiểm tra tiêu đề màn hình
//     await expect(page.locator('text="Curxor Tracking 🌊"')).toBeVisible();

//     // Kiểm tra phần input email
//     const emailInput = page.locator('input[placeholder="Email"]');
//     await expect(emailInput).toBeVisible();

//     // Nhập email hợp lệ
//     await emailInput.fill("ngoc@example.com");
//     await expect(emailInput).toHaveValue("ngoc@example.com");

//     // Kiểm tra và click nút Sign In
//     const signInButton = page.locator('text="Sign In"');
//     await expect(signInButton).toBeVisible();
//     await signInButton.click();

//     // Kiểm tra điều hướng đến màn hình Verify OTP
//     // await expect(page).toHaveURL(/\/verify-otp/);
//     // await page.waitForURL(/\/verify/); // Chờ điều hướng hoàn tất
//     await page.waitForURL(/\/verify(\?.*)?/);
//     await page.waitForSelector('input[placeholder="OTP"]', {
//       timeout: 7000,
//     });
//     // await expect(page).toHaveURL(/\/verify(\?.*)?/);

//     // Kiểm tra input OTP hiển thị
//     // const otpInput = page.locator('input[name="otp"]'); // hoặc class/id phù hợp

//     const otpInput = page.locator('input[placeholder="OTP"]');
//     await expect(otpInput).toBeVisible();

//     // Nhập mã OTP hợp lệ
//     await otpInput.fill("1234");
//     await expect(otpInput).toHaveValue("1234");

//     // Kiểm tra và click nút Verify
//     const verifyButton = page.locator('text="Verify"');
//     await expect(verifyButton).toBeVisible();
//     await verifyButton.click();

//     // // Kiểm tra điều hướng đến trang Home
//     // await expect(page).toHaveURL(/\/home/);
//     // Kiểm tra có thông báo lỗi OTP không
//     const errorMessage = page.locator('text="Invalid OTP"');
//     if (await errorMessage.isVisible()) {
//       console.error("OTP không hợp lệ!");
//       return;
//     }

//     // Đợi phản hồi API xác thực OTP
//     await page.waitForResponse(
//       (response) =>
//         response.url().includes("/verify-otp") && response.status() === 200
//     );

//     // Chờ điều hướng đến trang Home
//     await expect(page).toHaveURL(/\/home/, { timeout: 10000 });
//   });
// });
import { test, expect } from "@playwright/test";

test("Kiểm tra điều hướng sau khi xác thực OTP", async ({ page }) => {
    await page.waitForTimeout(3000); // Đợi một chút để tránh lỗi timeout
    await expect(page).toHaveURL(/\/home/);
});
