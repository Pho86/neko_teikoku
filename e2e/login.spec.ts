import { test, expect } from '@playwright/test'

const homeURL = 'http://localhost:3000/'
const loginURL = 'http://localhost:3000/login'

test.describe("Head Area", () => {
  test('should navigate to the login page', async ({ page }) => {
    await page.goto(loginURL)
    await expect(page).toHaveTitle('Login - Neko Teikoku');
  })
  test('The meta tag', async ({ page }) => {
    await page.goto(loginURL)

    const metaDescriptionOne = page.locator('meta[name="description"]')
    await expect(metaDescriptionOne).toHaveAttribute("content", "Neko Teikoku is a cozy cat web application to help you feel at ease. Meow meow.")
  })
})


test.describe("Login area", () => {
  test('find the start button and press it, then test the tabs, then login to a test account', async ({ page }) => {
    await page.goto(loginURL)
    await page.click('text=start')
    await page.click('text=register')
    await page.click('text=login')
    const emailinput = await page.locator('input').first().type('test@meow.meow', { delay: 50 });
    await page.click('text=LOGIN')
    const passwordinput = await page.locator('input').last().type('testaccount', { delay: 50 });
    const Submit = page.locator('button').last();
    await Submit.click()
    await expect(page).toHaveURL(homeURL)
  })
})