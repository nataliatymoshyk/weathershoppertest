import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://weathershopper.pythonanywhere.com/moisturizer');
  await page.getByRole('button', { name: 'Add' }).nth(5).click();
  await page.getByRole('button', { name: 'Add' }).nth(4).click();
});