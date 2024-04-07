// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://localhost:10000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/SOS2324-11/);
});

test('list data', async ({ page }) => {
  await page.goto('http://localhost:10000/structural-payment-data');

  await page.waitForTimeout(2000);
  // Expects page to have a heading with the name of Installation.
  let dataItemNumber = (await page.locator('.dataItem').all()).length

  expect(dataItemNumber).toBeGreaterThan(0);
});



