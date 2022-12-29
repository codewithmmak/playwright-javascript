const { expect } = require("@playwright/test");

exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.colorBtnLoc = page.locator("button[title='white']");
    this.sizeBtnLoc = page.locator("button[aria-label='size l']");
    this.addToCartBtnLoc = page.locator("//button[text()='Add To Cart']");
    this.productInCartLoc = page.locator(
      "(//span[text()='Special Edition T-Shirt'])[2]"
    );
  }

  async pageTitle() {
    await expect(this.page).toHaveText(
      "Special Edition T-Shirt - ACME Storefront"
    );
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
    expect(this.productInCartLoc).toContainText("Special Edition T-Shirt");
  }
};
