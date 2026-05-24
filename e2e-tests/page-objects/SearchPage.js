const { expect } = require("@playwright/test");

exports.SearchPage = class SearchPage {
  constructor(page, catalogData = {}) {
    this.page = page;
    this.categoryPath = catalogData.categoryPath || "/search/stickers";
    this.productPath = catalogData.productPath || "/product/acme-sticker";
    this.productName = catalogData.productName || "Acme Sticker";

    this.categoryLoc = page.locator(`nav a[href='${this.categoryPath}']`);
    this.productLinkLoc = page.locator(`a[href='${this.productPath}']`).first();
    this.pageHeaderLoc = page.getByRole("heading", { name: new RegExp(this.productName, "i") }).first();
  }

  async navigatetoProductDetailPage() {
    await this.categoryLoc.click();
    await this.productLinkLoc.click();
  }

  async pageHeader() {
    await expect(this.pageHeaderLoc).toHaveText(this.productName);
  }
};
