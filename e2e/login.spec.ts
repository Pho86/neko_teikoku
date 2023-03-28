import { test, expect } from '@playwright/test'

const homeURL = 'http://localhost:3000/'
const loginURL = 'http://localhost:3000/login'

test.describe("Head Area of login page", () => {
  test('should navigate to the login page', async ({ page }) => {
    await page.goto(loginURL)
    await expect(page).toHaveTitle('Login - Neko Teikoku');
  })

  test('The meta tag description', async ({ page }) => {
    await page.goto(loginURL)
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute("content", "Neko Teikoku is a cozy cat web application to help you feel at ease. Meow meow.")
  })

  test('The meta tag og description', async ({ page }) => {
    await page.goto(loginURL)
    const metaDescription = page.locator('meta[property="og:description"]');
    await expect(metaDescription).toHaveAttribute('content', 'Neko Teikoku is a cozy cat web application to help you feel at ease. Meow meow.')
  })

  test('The meta tag icon', async ({ page }) => {
    await page.goto(loginURL)
    const linkTag = page.locator('link[rel="icon"]');
    await expect(linkTag).toHaveAttribute('href', '/icons/advisor_icon.svg')
  })
})


test.describe("Login area tests", () => {
  test('find the start button and press it, then test the tabs, then login to a test account', async ({ page }) => {
    await page.goto(loginURL)
    const start = page.locator('#logo')
    await start.click()
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

test.describe("forget password popup", () => {
  test('find the forgot password button then submit a request', async ({ page }) => {
    await page.goto(loginURL)
    await page.waitForTimeout(1500);
    const start = page.locator('#logo')
    await page.waitForTimeout(1500);
    await start.click()
    await page.click('text=Forgot Your Password?')
    const emailinput = await page.locator('input').last().type('test@meow.meow', { delay: 50 });
    await page.click('text=SUBMIT')
    const Submit = page.locator('button').last();
    await Submit.click()
    await page.waitForTimeout(5000);
    const emailCon = page.locator('text=an email has been sent');
    const computedStyles = await emailCon.evaluate((element) => {
      const styles = window.getComputedStyle(element);
      return {
        fontWeight: styles.fontWeight,
      };
    });
    expect(computedStyles.fontWeight).toEqual('400');
  })
})
