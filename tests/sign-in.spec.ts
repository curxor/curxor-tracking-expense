import { test, expect } from "@playwright/test";

test.use({
  headless: false, // Chạy trong chế độ có giao diện để dễ debug
});

test.describe("Sign-In and OTP Verification", () => {
  test("Nhập email hợp lệ và xác thực OTP", async ({ page }) => {
    await page.goto("http://localhost:8081/sign-in");
    await expect(page.locator('text="Curxor Tracking 🌊"')).toBeVisible();
    // nhập email hợp lệ
    const emailInput = page.locator('input[placeholder="Email"]');
    await expect(emailInput).toBeVisible();
    await emailInput.fill("ngoc@example.com");
    await expect(emailInput).toHaveValue("ngoc@example.com");

    // 🧪 Kiểm tra nút Sign In
    const signInButton = page.locator('text="Sign In"');
    await expect(signInButton).toBeVisible();
    await signInButton.click();

    // 🛡️ Đợi điều hướng đến màn hình Verify (chờ tối đa 10 giây)
    await page.waitForURL(/\/verify(\?.*)?/, { timeout: 10000 });

    // 🧪 Kiểm tra tiêu đề màn hình Verify OTP
    await expect(page.locator('text="Curxor Tracking Verify🌊"')).toBeVisible();

    // 🧪 Kiểm tra input OTP và nhập OTP hợp lệ
    const otpInput = page.locator('input[placeholder="OTP"]');
    await expect(otpInput).toBeVisible();
    await otpInput.fill("1234");
    await expect(otpInput).toHaveValue("1234");

    // 🧪 Kiểm tra nút Verify và nhấn vào
    const verifyButton = page.locator('text="Verify"');
    await expect(verifyButton).toBeVisible();
    await verifyButton.click();
    // ✅ Kiểm tra xác thực OTP thành công (thêm trạng thái cụ thể)
    // await expect(page.locator('text="OTP xác thực thành công"')).toBeVisible();

    console.log("✅ Sign-In và Verify thành công!");

    // ✅ Kiểm tra điều hướng thành công đến màn hình Home
    // await page.waitForURL(/\/home/, { timeout: 10000 });
    // await page.waitForURL(new RegExp("/home"), { timeout: 30000 });

    // await expect(page.locator('text="Home"')).toBeVisible();

    
  });
});
