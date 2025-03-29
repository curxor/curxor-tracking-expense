// import { test, expect } from "@playwright/test";
// import { testTotalComponent } from "./component-test/total.spec";
// import { testBalanceComponent } from "./component-test/balance.spec";
// import { testHistoryComponent } from "./component-test/history-item.spec";

// test.use({
//   headless: false,
// });

// test.describe("Home Screen", () => {
//   test("Kiểm tra các thành phần trên màn hình Home", async ({ page }) => {
//     // 🏠 Mở màn hình Home
//     await page.goto("http://localhost:8081/home");

//     // 🧪 Kiểm tra tiêu đề màn hình Home
//     await expect(page.locator('text="Overview"')).toBeVisible();

//     // 🔄 Gọi lại các kiểm thử thành phần
//     await testBalanceComponent(page);
//     await testTotalComponent(page);
//     await testHistoryComponent(page);

//     console.log("✅ Kiểm tra màn hình Home thành công!");
//   });
// });
import { test, expect } from "@playwright/test";
import {
  testBalanceComponent,
  testTotalComponent,
  testHistoryComponent,
} from "./helpers/component-helper";

test("Kiểm tra các thành phần trên màn hình Home", async ({ page }) => {
  // Mở màn hình Home
  await page.goto("http://localhost:8081/home");

  // Chờ cho màn hình Home được load hoàn chỉnh
  await page
    .locator('[data-testid="home-container"]')
    .waitFor({ state: "visible", timeout: 10000 });

  // Kiểm tra các thành phần
  await testBalanceComponent(page);
  await testTotalComponent(page);
  await testHistoryComponent(page);
});
