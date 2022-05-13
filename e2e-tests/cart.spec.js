const { test, expect } = require('@playwright/test');
const { SearchPage } = require('./page-objects/pages/SearchPage');
const { HomePage } = require('./page-objects/pages/HomePage');
const { CartPage } = require('./page-objects/pages/CartPage');

test.describe('Cart Tests', () => {

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.pageTitle();
    });

    test.skip('Verify user is able to add product to Cart', async ({ page }) => {
        const searchPage = new SearchPage(page);
        await searchPage.navigatetoProductDetailPage();
        await searchPage.pageTitle();

        const cartPage = new CartPage(page);
        await cartPage.selectColour();
        await cartPage.selectSize();
        await cartPage.addToCart();
        // await page.waitForLoadState();
        await page.waitForTimeout(10000);
        await cartPage.productInCart();
    });
})