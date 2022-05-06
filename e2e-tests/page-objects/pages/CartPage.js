const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {

    constructor(page) {
        this.page = page;
        this.colorBtnLoc = page.locator("button[title='white']");
        this.sizeBtnLoc = page.locator("button[aria-label='size l']");
        this.addToCartBtnLoc = page.locator("//button[text()='Add To Cart']");
        this.productInCartLoc = page.locator("(//span[text()='Lightweight Jacket'])[2]");

    }

    async pageTitle() {
        await expect(this.pageTitleLoc).toHaveText('Lightweight Jacket - ACME Storefront');
    }

    async selectColour() {
        await this.colorBtnLoc.click();
    }

    async selectSize() {
        await this.sizeBtnLoc.click();
    }

    async selectSize() {
        await this.sizeBtnLoc.click();
    }

    async addToCart() {
        await this.addToCartBtnLoc.click();
    }

    async productInCart() {
        // await waitForLoadState();
        // await page.waitForTimeout(10000);
        expect(this.productInCartLoc).toContainText("Lightweight Jacket");
    }



}