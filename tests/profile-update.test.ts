import { firefox, test } from "@playwright/test";

test("Profile update", async () => {
  try {
    const browser = await firefox.launch({
      headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.naukri.com/");

    // close optional 'use gogle account' popup which is inside an iframe
    await page.waitForSelector('iframe[src*="accounts.google.com/gsi/iframe"]');
    const frame = page.frameLocator(
      'iframe[src*="accounts.google.com/gsi/iframe"]'
    );
    await frame.locator('//*[@id="close"]').click();

    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    // login
    await page.click('//*[@id="login_Layer"]');
    await page.fill(
      '//*[@id="root"]/div[4]/div[2]/div/div/div[2]/div/form/div[2]/input',
      email
    );
    await page.fill(
      '//*[@id="root"]/div[4]/div[2]/div/div/div[2]/div/form/div[3]/input',
      password
    );
    await page.click(".loginButton");

    await page.click(".view-profile-wrapper");
    const closeButton = page.locator(".chatBot-ic-cross");
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }

    await page.click('//*[@id="lazyResumeHead"]/div/div/div[1]/span[2]');

    await page
      .locator("xpath=/html/body/div[6]/div[8]/div[2]/form/div[3]/div/button")
      .click();

    console.log("Profile update successful");

    await page.waitForTimeout(5000);
  } catch (error) {
    console.log(error);
  }
});
