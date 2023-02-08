import { test, expect } from '@playwright/test'

const loginUrl = 'http://localhost:3000/login'

test.describe("Head Area", () => {
  test('should navigate to the login page', async ({ page }) => {
    await page.goto(loginUrl)
    await expect(page).toHaveTitle('Login - Neko Teikoku');
  })
  test('The meta tag', async ({ page }) => {
    await page.goto(loginUrl)

    const metaDescriptionOne = page.locator('meta[name="description"]')
    await expect(metaDescriptionOne).toHaveAttribute("content", "Neko Teikoku is a cozy cat web application to help you feel at ease. Meow meow.")
  })
})

