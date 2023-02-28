import { test, expect } from '@playwright/test'
import { signIn } from './helper';

const homeURL = 'http://localhost:3000/'
const loginURL = 'http://localhost:3000/login'


test.describe("Home game area, account required functionalities", () => {
   test('find the advisor and click on him and find the textbox', async ({ page }) => {
      await signIn(page)
      const advisor = page.locator('#advisor')
      await advisor.click()
      const advisor_text = page.locator('#advisor_text');
      const computedStyles = await advisor_text.evaluate((element) => {
         const styles = window.getComputedStyle(element);
         return {
            background: styles.backgroundColor,
            border: styles.border,
            borderRadius: styles.borderRadius
         };
      });
      expect(computedStyles.background).toEqual('rgba(254, 249, 237, 0.8)');
      expect(computedStyles.borderRadius).toEqual('16px');
      expect(computedStyles.border).toEqual('3px solid rgb(77, 70, 153)');
   });

   test('open the catdex and find the asian cat and click it', async ({ page }) => {
      await signIn(page)
      await page.waitForTimeout(5000);
      const catdex = page.locator('#catdex');
      await catdex.click();
      await expect(page.getByAltText("Go back")).toBeVisible();
      await page.getByAltText("Go forward").click();
      const asian = await page.locator('div').filter({ hasText: 'Asian' }).first();
      await asian.click()
   });
})


test.describe("Home game area, no login", () => {
   test('find the h2 of meowing @ __place', async ({ page }) => {
      await page.goto(homeURL)
      const meowing = page.locator('h2')
      expect(meowing).toContainText("meowing @")
      const computedStyles = await meowing.evaluate((element) => {
         const styles = window.getComputedStyle(element);
         return {
            fontWeight: styles.fontWeight,
         };
      });
      expect(computedStyles.fontWeight).toEqual('600');
   })
})