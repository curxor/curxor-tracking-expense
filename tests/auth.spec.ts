// import { test, expect } from "@playwright/test";
// test.use({
//   headless: false, // Chạy trong chế độ có giao diện
// });
// test.describe("Sign-In Screen", () => {
//   test("Nhập email hợp lệ", async ({ page }) => {
//     // Mở màn hình Sign-In
//     await page.goto("http://localhost:8081/sign-in");
//     await page.pause();
//     // Kiểm tra tiêu đề màn hình có hiển thị đúng không
//     const title = await page.locator('text="Curxor Tracking 🌊"').isVisible();
//     expect(title).toBeTruthy();

//     // Kiểm tra phần input email có tồn tại không
//     const emailInput = await page.locator('input[placeholder="Email"]');
//     expect(await emailInput.isVisible()).toBeTruthy();

//     // Nhập email hợp lệ
//     await emailInput.fill("ngoc@example.com");
//     expect(await emailInput.inputValue()).toBe("ngoc@example.com");
//     await page.pause();
//     // Kiểm tra nút Sign In hiển thị và có thể click
//     const signInButton = await page.locator('text="Sign In"');
//     // expect(await signInButton.isVisible()).toBeTruthy();
//     await signInButton.click();
//     // await expect(page).toHaveURL(/\/verify-otp/);
//   });
// });
// import { test, expect } from "@playwright/test";

// test.use({
//   headless: false, // Chạy trong chế độ có giao diện
// });

// test.describe("Sign-In Screen", () => {
//   test("Nhập email hợp lệ và điều hướng đến Verify OTP", async ({ page }) => {
//     // Mở màn hình Sign-In
//     await page.goto("http://localhost:8081/sign-in");

//     // Kiểm tra tiêu đề có hiển thị đúng không
//     await expect(page.locator('text="Curxor Tracking 🌊"')).toBeVisible();

//     // Kiểm tra input email có tồn tại không
//     const emailInput = page.locator('input[placeholder="Email"]');
//     await expect(emailInput).toBeVisible();

//     // Nhập email hợp lệ
//     await emailInput.fill("ngoc@example.com");
//     await expect(emailInput).toHaveValue("ngoc@example.com");

//     // Kiểm tra nút Sign In hiển thị và có thể click
//     const signInButton = page.locator('text="Sign In"');
//     await expect(signInButton).toBeVisible();
//     await signInButton.click();

//     // Kiểm tra điều hướng đến trang xác thực OTP
//     await expect(page).toHaveURL(/\/verify-otp/);
//   });
// });
import { test, expect } from "@playwright/test";

test.use({
  headless: false, // Chạy trong chế độ có giao diện
});

test.describe("Sign-In and OTP Verification", () => {
  test("Nhập email hợp lệ và xác thực OTP", async ({ page }) => {
    // Mở màn hình Sign-In
    await page.goto("http://localhost:8081/sign-in");

    // Kiểm tra tiêu đề màn hình
    await expect(page.locator('text="Curxor Tracking 🌊"')).toBeVisible();

    // Kiểm tra phần input email
    const emailInput = page.locator('input[placeholder="Email"]');
    await expect(emailInput).toBeVisible();

    // Nhập email hợp lệ
    await emailInput.fill("ngoc@example.com");
    await expect(emailInput).toHaveValue("ngoc@example.com");

    // Kiểm tra và click nút Sign In
    const signInButton = page.locator('text="Sign In"');
    await expect(signInButton).toBeVisible();
    await signInButton.click();

    // Kiểm tra điều hướng đến màn hình Verify OTP
    // await expect(page).toHaveURL(/\/verify-otp/);
    // await page.waitForURL(/\/verify/); // Chờ điều hướng hoàn tất
    await page.waitForURL(/\/verify(\?.*)?/);
    await page.waitForSelector('input[placeholder="OTP"]', {
      timeout: 7000,
    });
    // await expect(page).toHaveURL(/\/verify(\?.*)?/);

    // Kiểm tra input OTP hiển thị
    // const otpInput = page.locator('input[name="otp"]'); // hoặc class/id phù hợp

    const otpInput = page.locator('input[placeholder="OTP"]');
    await expect(otpInput).toBeVisible();

    // Nhập mã OTP hợp lệ
    await otpInput.fill("1234");
    await expect(otpInput).toHaveValue("1234");

    // Kiểm tra và click nút Verify
    const verifyButton = page.locator('text="Verify"');
    await expect(verifyButton).toBeVisible();
    await verifyButton.click();
  });
});
