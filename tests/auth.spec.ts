import { test, expect } from '@playwright/test';

test.describe('E2E Тести авторизації', () => {

  test('Тест 1: Сторінка логіну має правильний заголовок', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await expect(page.locator('h1').first()).toContainText('З поверненням!');
  });

  test('Тест 2: Навігація між сторінками працює', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    
    await page.locator('a[href="/register"]').click({ force: true });
    
    await page.waitForURL('**/register', { timeout: 5000 });
    await expect(page).toHaveURL(/.*register/);
  });

  test('Тест 3: Кнопки соціальних мереж присутні на сторінці', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    
    await expect(page.locator('button', { hasText: 'Google' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'GitHub' })).toBeVisible();
  });

});