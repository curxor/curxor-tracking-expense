import { test, expect } from "@playwright/test";

export const testHistoryComponent = async (page) => {
  await expect(page.locator('text="Latest Entries"')).toBeVisible();
  const firstEntry = await page.locator('text="Groceries"');
  await expect(firstEntry).toBeVisible();
};
