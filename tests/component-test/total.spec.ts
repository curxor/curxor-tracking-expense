import { test, expect } from "@playwright/test";

export const testTotalComponent = async (page) => {
  await expect(page.locator('text="Total income this month"')).toBeVisible();
  await expect(page.locator('text="Total expense this month"')).toBeVisible();
};
