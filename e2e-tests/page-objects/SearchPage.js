const { expect } = require("@playwright/test");

exports.SearchPage = class SearchPage {
  constructor(page) {
    this.page = page;
    this.allLinkLoc = page.locator("//a[text()='All']");
    this.acmeLinkLoc = page.locator("a[href='/search/designers/acme']");
    this.productLinkLoc = page.locator("//span[text()='Lightweight Jacket']");
    this.pageTitleLoc = page.locator("(//title)[1]");
  }

  async navigatetoProductDetailPage() {
    await this.allLinkLoc.click();
    await this.acmeLinkLoc.click();
    await this.productLinkLoc.click();
  }

  async pageTitle() {
    await expect(this.pageTitleLoc).toHaveText(
      "Lightweight Jacket - ACME Storefront"
    );
  }
};
