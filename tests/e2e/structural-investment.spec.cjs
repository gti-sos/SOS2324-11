// Importación de las funciones necesarias de Playwright
const { test, expect, beforeAll, afterAll, beforeEach } = require('@playwright/test');
let page;

// Inicialización y limpieza del contexto de la página
beforeAll(async ({ browser }) => {
  // Crea una nueva página del navegador antes de todas las pruebas
  page = await browser.newPage();
});


afterAll(async () => {
  // Cierra la página del navegador después de todas las pruebas
  await page.close();
});


beforeEach(async () => {
  // Carga la página de la aplicación web y realiza algunas acciones necesarias antes de cada prueba
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
  const expectedText = 'Descripción del proyecto';
  const pageContent = await page.content();
  expect(pageContent).toContain(expectedText);
});
test('has specific text4', async ({ page }) => {
  await page.goto('http://localhost:10000');
  const expectedText = 'Repositorio de GitHub';
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
  const expectedText = 'Documentos de Postman';
  const pageContent = await page.content();
  expect(pageContent).toContain(expectedText);
});
test('has specific text8', async ({ page }) => {
  await page.goto('http://localhost:10000');
  const expectedText = 'Front-end';
  const pageContent = await page.content();
  expect(pageContent).toContain(expectedText);
});

// Prueba de que la pagina está
test('load pag', async () => {
  await page.goto('http://localhost:10000/structural-investment');
  await page.waitForLoadState('load');
  const items = await page.$$('.card-container .card');
  expect(items.length).toBe(0);
});

// Prueba de carga y lista de datos
test('load and list data', async () => {
  await page.goto('http://localhost:10000/structural-investment');
  await page.waitForLoadState('load');
  await page.click('.initial');
  await page.waitForTimeout(10000); 
  const items = await page.$$('.card-container .card');
  expect(items.length).toBeGreaterThan(0);
});

// Prueba de eliminación de todos los datos
test('delete all data', async () => {
  await page.goto('http://localhost:10000/structural-investment');
  await page.waitForLoadState('load');
  await page.waitForSelector('.final button:nth-child(2)');
  await page.click('.final button:nth-child(2)');
  await page.waitForTimeout(3000);
  const elements = await page.$$('.card-container .card');
  expect(elements.length).toBe(0);
 });
