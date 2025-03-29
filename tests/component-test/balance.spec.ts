import { test, expect } from "@playwright/test";

// export const testBalanceComponent = async (page) => {
//   await expect(page.locator('text="Balance"')).toBeVisible();
//   const balanceValue = await page.locator('text="$1,000"').innerText();
//   expect(balanceValue).toContain("$");
// };
// export const testBalanceComponent = async (page) => {
//   // Chờ phần tử xuất hiện với timeout là 10 giây
//   await page.locator('text="Balance"').waitFor({ state: 'visible', timeout: 10000 });
  
//   // Kiểm tra hiển thị
//   await expect(page.locator('text="Balance"')).toBeVisible();

//   // Kiểm tra giá trị balance
//   const balanceValue = await page.locator('text="$1,000"').innerText();
//   expect(balanceValue).toContain("$");
// };
import { expect, Page } from '@playwright/test';

export const testBalanceComponent = async (page: Page) => {
  // Chờ phần tử xuất hiện trước khi kiểm tra
  await page.locator('[data-testid="balance-container"]').waitFor({ state: 'visible', timeout: 10000 });

  // Kiểm tra hình ảnh đã render
  await expect(page.locator('[data-testid="balance-image"]')).toBeVisible();

  // Kiểm tra giá trị số dư đã render đúng
  const balanceValue = await page.locator('[data-testid="balance-value"]').innerText();
  expect(balanceValue).toContain('₫'); // Đảm bảo rằng giá trị được hiển thị đúng định dạng
};


