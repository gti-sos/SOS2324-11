const { test, expect, beforeAll, afterAll, beforeEach } = require('@playwright/test');
let page;

beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});


afterAll(async () => {
  await page.close();
});


beforeEach(async () => {
  await page.goto('http://localhost:10000/structural-investment');
  await page.waitForLoadState('load');
  await page.waitForTimeout(1000);
  await page.waitForSelector('.final button:nth-child(2)');
  await page.click('.final button:nth-child(2)');
  await page.waitForTimeout(3000);
});

test('has specific text1', async ({ page }) => {
  await page.goto('http://localhost:10000');
  const expectedText = 'Participantes y datos';
  const pageContent = await page.content();
  expect(pageContent).toContain(expectedText);
});
test('has specific text2', async ({ page }) => {
  await page.goto('http://localhost:10000');
  const expectedText = 'GitHub';
  const pageContent = await page.content();
  expect(pageContent).toContain(expectedText);
});

test('has specific text3', async ({ page }) => {
  await page.goto('http://localhost:10000');
  const expectedText = 'Project Description';
  const pageContent = await page.content();
  expect(pageContent).toContain(expectedText);
});
test('has specific text4', async ({ page }) => {
  await page.goto('http://localhost:10000');
  const expectedText = 'Repository';
  const pageContent = await page.content();
  expect(pageContent).toContain(expectedText);
});
test('has specific text5', async ({ page }) => {
  await page.goto('http://localhost:10000');
  const expectedText = 'URL';
  const pageContent = await page.content();
  expect(pageContent).toContain(expectedText);
});
test('has specific text6', async ({ page }) => {
  await page.goto('http://localhost:10000');
  const expectedText = 'APIs';
  const pageContent = await page.content();
  expect(pageContent).toContain(expectedText);
});
test('has specific text7', async ({ page }) => {
  await page.goto('http://localhost:10000');
  const expectedText = 'Postman Documents';
  const pageContent = await page.content();
  expect(pageContent).toContain(expectedText);
});
test('has specific text8', async ({ page }) => {
  await page.goto('http://localhost:10000');
  const expectedText = 'Front-end';
  const pageContent = await page.content();
  expect(pageContent).toContain(expectedText);
});


test('load pag', async () => {
  await page.goto('http://localhost:10000/structural-investment');
  await page.waitForLoadState('load');
  const items = await page.$$('.card-container .card');
  expect(items.length).toBe(0);
});


test('load and list data', async () => {
  await page.goto('http://localhost:10000/structural-investment');
  await page.waitForLoadState('load');
  await page.click('.initial');
  await page.waitForTimeout(10000); 
  const items = await page.$$('.card-container .card');
  expect(items.length).toBeGreaterThan(0);
});


test('delete all data', async () => {
  await page.goto('http://localhost:10000/structural-investment');
  await page.waitForLoadState('load');
  await page.waitForSelector('.final button:nth-child(2)');
  await page.click('.final button:nth-child(2)');
  await page.waitForTimeout(3000);
  const elements = await page.$$('.card-container .card');
  expect(elements.length).toBe(0);
 });


 
 

