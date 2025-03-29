import { expect, Page } from '@playwright/test';

export const testBalanceComponent = async (page: Page) => {
  // Chờ phần tử xuất hiện
  await page.locator('text="Balance"').waitFor({ state: 'visible', timeout: 10000 });
  await expect(page.locator('text="Balance"')).toBeVisible();

  // Kiểm tra giá trị balance
  const balanceValue = await page.locator('text="$1,000"').innerText();
  expect(balanceValue).toContain("$");
};

export const testTotalComponent = async (page: Page) => {
  await page.locator('text="Total"').waitFor({ state: 'visible', timeout: 10000 });
  await expect(page.locator('text="Total"')).toBeVisible();
};

export const testHistoryComponent = async (page: Page) => {
  await page.locator('text="History"').waitFor({ state: 'visible', timeout: 10000 });
  await expect(page.locator('text="History"')).toBeVisible();
};
