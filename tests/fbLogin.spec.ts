import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
const envConfig = require(`../config/${process.env.TEST_ENV || "dev"}.env.ts`).default;

test.skip('login works in selected environment', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(envConfig.baseURL);
  //await loginPage.gotoLogin();
  

  await loginPage.login(envConfig.username, envConfig.password);
  //await expect(loginPage.welcomeMessage).toHaveText(/Welcome/);
}); 



test('Create Account', async ({ page }) => {

  await page.goto('https://www.facebook.com/');
  await page.getByRole('link', { name: 'Create new account' }).click();
  await page.waitForLoadState('networkidle');
  await page.getByRole('textbox', { name: 'First name' }).fill('John');
  await page.getByRole('textbox', { name: 'Surname', exact: true }).fill('Cena');

  
  
  await page.getByLabel('Select day').locator('div').filter({ hasText: /^Day$/ }).click();
  await page.locator('div').filter({ hasText: /^3$/ }).nth(1).click();
  await page.getByLabel('Select month').locator('div').filter({ hasText: /^Month$/ }).click();
  await page.getByText('June').click();
  await page.getByLabel('Select year').locator('div').filter({ hasText: /^Year$/ }).click();
  await page.getByText('2021', { exact: true }).click();
  await page.locator('div').filter({ hasText: /^Select your gender$/ }).nth(1).click();
  await page.getByText('Male', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Mobile number or email' }).click();
  await page.getByRole('textbox', { name: 'Mobile number or email' }).fill('sdfsdf');
  await page.getByRole('textbox', { name: 'Password Password' }).click();
  await page.getByRole('textbox', { name: 'Password Password' }).fill('sdfsdf');
  await page.getByRole('button', { name: 'Submit' }).click();
});