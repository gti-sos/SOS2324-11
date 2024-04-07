// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://localhost:10000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/SOS2324-11/);
});

test('list data', async ({ page }) => {
  await page.goto('http://localhost:10000/socioeconomics-tracker-using-unconventional-data');

  

  await page.click('button:text("Cargar datos iniciales")');
  await page.waitForTimeout(800);
  // Expects page to have a heading with the name of Installation.
  let dataItemNumber = (await page.locator('.dataItem').all()).length

  expect(dataItemNumber).toBeGreaterThan(0);
});


test('create new data', async ({ page }) => {
  // Navegar a la página
  await page.goto('http://localhost:10000/socioeconomics-tracker-using-unconventional-data'); // Reemplaza la URL con la URL de tu página

  
  await page.click('button:text("Eliminar todos los datos")');
  
  // Hacer clic en el botón "Crear nuevo dato"
  await page.click('button:text("Crear nuevo dato")');

  // Esperar a que aparezca el mensaje de éxito
  await page.waitForSelector('#message-container');
  const message = await page.textContent('#message-container');

  // Verificar que el mensaje de éxito sea correcto
  expect(message).toContain('El dato se ha creado correctamente');
});

/*
test('delete specific data', async ({ page }) => {
  // Navegar a la página
  await page.goto('http://localhost:10000/socioeconomics-tracker-using-unconventional-data'); // Reemplaza la URL con la URL de tu página

  await page.click('button:text("Eliminar todos los datos")');
  await page.click('button:text("Eliminar todos los datos")');
  await page.click('button:text("Cargar datos iniciales")');
  await page.click('button:text("Cargar datos iniciales")');
  await page.click('button:text("Cargar datos iniciales")');
  await page.click('button:text("Cargar datos iniciales")');
  await page.click('button:text("Cargar datos iniciales")');
  
  // Esperar a que aparezca el botón "Borrar"
  await page.waitForSelector('button:text("Borrar")');

  // Hacer clic en el botón "Borrar"
  await page.click('button:text("Borrar")');

  // Esperar a que aparezca el mensaje de éxito
  await page.waitForSelector('#message-container');
  const message = await page.textContent('#message-container');

  // Verificar que el mensaje de éxito sea correcto
  expect(message).toContain('Dato eliminado correctamente');
});
*/



test('delete all data', async ({ page }) => {
  // Navegar a la página
  await page.goto('http://localhost:10000/socioeconomics-tracker-using-unconventional-data'); // Reemplaza la URL con la URL de tu página

  await page.click('button:text("Eliminar todos los datos")');

  await page.click('button:text("Cargar datos iniciales")');
  await page.waitForTimeout(1000);
  await page.click('button:text("Cargar datos iniciales")');
  await page.click('button:text("Cargar datos iniciales")');

  // Hacer clic en el botón "Eliminar todos los datos"
  await page.click('button:text("Eliminar todos los datos")');
  

  // Esperar a que aparezca el mensaje de éxito
  await page.waitForSelector('#message-container');
  const message = await page.textContent('#message-container');

  // Verificar que el mensaje de éxito sea correcto
  expect(message).toContain('Se han eliminado todos los datos correctamente');
});