const { expect } = require("@playwright/test");

exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
    this.acceptCookies = page.getByRole("button", { name: /accept cookies/i });
    this.logoLoc = page.getByRole("link", { name: /Acme Store/i }).first();
    this.topNavLinksLoc = page.locator(
      "nav a[href='/search'], nav a[href='/search/shirts'], nav a[href='/search/stickers']"
    );
  }

  async navigate() {
    await this.page.goto("/");
    // Cookie banner may not always appear depending on prior state.
    if (await this.acceptCookies.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.acceptCookies.click();
    }
  }

  async pageTitle() {
    await expect(this.page).toHaveTitle("Acme Store");
  }

  async logo() {
    await expect(this.logoLoc).toBeVisible();
  }
};
