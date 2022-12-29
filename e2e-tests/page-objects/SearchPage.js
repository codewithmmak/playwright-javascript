const { expect } = require("@playwright/test");

exports.SearchPage = class SearchPage {
  constructor(page) {
    this.page = page;
    this.allLinkLoc = page.locator("//a[text()='All']");
    this.acmeLinkLoc = page.locator("a[href='/search/designers/acme']");
    this.productLinkLoc = page.locator("//span[text()='Special Edition T-Shirt']");
    this.pageHeaderLoc = page.locator("h3[class='ProductTag_name__C_niq'] span");
  }

  async navigatetoProductDetailPage() {
    await this.allLinkLoc.click();
    await this.acmeLinkLoc.click();
    await this.productLinkLoc.click();
  }

  async pageHeader() {
    await expect(this.pageHeaderLoc).toHaveText("Special Edition T-Shirt");
  }
};
