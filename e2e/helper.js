import { expect } from '@playwright/test'

const loginURL = 'http://localhost:3000/login'
const homeURL = 'http://localhost:3000/'

export async function signIn(page) {
   await page.goto(loginURL)
   const start = page.locator('#start')
   await start.click()
   await page.waitForTimeout(1500);
   const emailinput = await page.locator('input').first().type('test@meow.meow', { delay: 50 });
   const passwordinput = await page.locator('input').last().type('testaccount', { delay: 50 });
   const Submit = page.locator('button').last();
   await Submit.click()
   await expect(page).toHaveURL(homeURL)
}
