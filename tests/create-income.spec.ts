// import { test, expect } from "@playwright/test";

// const userMessage = "Thêm thu nhập 100000 từ công việc";
// const expectedAmount = "100000";
// const expectedDescription = "công việc";
// test.use({
//   headless: false, // Chạy trong chế độ có giao diện
// });

// test("Tạo thu nhập thành công", async ({ page }) => {
//   await page.goto("http://localhost:8081/chat");

//   // Nhập tin nhắn tạo thu nhập
//   await page.fill('[placeholder="Type a message..."]', userMessage);
//   // Gửi tin nhắn
//   await page.keyboard.press("Enter");
//   // Kiểm tra tin nhắn của người dùng hiển thị đúng
//   await expect(page.locator(`text=${userMessage}`)).toBeVisible();
//   // Chờ bot phản hồi
//   // await expect(page.locator("text=Bot is typing...")).toBeVisible();
//   // await expect(page.locator("text=Bot is typing...")).toBeHidden();
//   const botTyping = page.locator("text=Bot is typing...");
//   if (await botTyping.isVisible({ timeout: 2000 })) {
//     await expect(botTyping).toBeVisible();
//     await expect(botTyping).toBeHidden();
//   }

//   // Kiểm tra tin nhắn phản hồi của bot
//   // const botResponse = await page.locator(`text=Đã thêm thu nhập ${expectedAmount} từ ${expectedDescription}`).isVisible();
//   // expect(botResponse).toBeTruthy();

//   // const transactionAmount = await page
//   //   .locator(`text=${expectedAmount}`)
//   //   .isVisible();
//   // const transactionDescription = await page
//   //   .locator(`text=${expectedDescription}`)
//   //   .isVisible();
//   // await page.pause();
//   // expect(transactionAmount).toBeTruthy();
//   // expect(transactionDescription).toBeTruthy();
//   const botResponseLocator = page.locator(
//     `text=Đã thêm thu nhập ${expectedAmount} từ ${expectedDescription}`
//   );

//   const actualResponse = await botResponseLocator
//     .textContent({ timeout: 60000 })
//     .catch(() => null);
//   console.log("👉 Actual bot response:", actualResponse?.trim());

//   // Chờ lâu hơn nếu cần
//   await expect(botResponseLocator).toBeVisible({ timeout: 5000 });

//   // Kiểm tra tin nhắn phản hồi của bot có số tiền và mô tả chính xác
//   const transactionAmount = await page
//     .locator(`text=${expectedAmount}`)
//     .isVisible();
//   const transactionDescription = await page
//     .locator(`text=${expectedDescription}`)
//     .isVisible();

//   expect(transactionAmount).toBeTruthy();
//   expect(transactionDescription).toBeTruthy();
// });
import { test, expect } from "@playwright/test";

const userMessage = "Thêm thu nhập 100000 từ công việc";
const expectedAmount = "100000";
const expectedDescription = "công việc";

test.use({ headless: false }); // Chạy trong chế độ có giao diện

test("Tạo thu nhập thành công", async ({ page }) => {
  await page.goto("http://localhost:8081/chat");

  // ✅ Nhập tin nhắn và gửi
  await page.fill('[placeholder="Type a message..."]', userMessage);
  await page.keyboard.press("Enter");

  // ✅ Kiểm tra tin nhắn của người dùng hiển thị đúng
  await expect(page.locator(`text=${userMessage}`)).toBeVisible();

  // ✅ Chờ bot phản hồi nếu có
  const botTyping = page.locator("text=Bot is typing...");
  if (await botTyping.isVisible({ timeout: 2000 })) {
    await expect(botTyping).toBeHidden(); // Chờ bot gõ xong
  }

  // ✅ Kiểm tra phản hồi của bot
  const botResponse = page.locator(
    `text=Đã thêm thu nhập ${expectedAmount} từ ${expectedDescription}`
  );
  await expect(botResponse).toBeVisible({ timeout: 6000 }); // Chờ phản hồi tối đa 5s

  // ✅ Kiểm tra giá trị số tiền và mô tả có trong tin nhắn của bot
  expect(
    await page.locator(`text=${expectedAmount}`).isVisible()
  ).toBeTruthy();
  expect(
    await page.locator(`text=${expectedDescription}`).isVisible()
  ).toBeTruthy();
});
