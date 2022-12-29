const { expect } = require("@playwright/test");

exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
    this.acceptCookies = page.locator(`//button[text()='Accept cookies']`);
    this.logoLoc = page.locator('(//*[name()="rect"])[1]');
    this.topNavLinksLoc = page.locator(
      "//nav[@class='Navbar_navMenu__lJ9fT']/a"
    );
  }

  async navigate() {
    await this.page.goto("https://demo.vercel.store");
    // Accept cookies
    await this.acceptCookies.click();
  }

  async pageTitle() {
    await expect(this.page).toHaveTitle("ACME Storefront | Powered by Next.js Commerce");
  }

  async logo() {
    await expect(this.logoLoc).toBeVisible();
  }
};
