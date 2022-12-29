const { test, expect } = require("@playwright/test");
const { SearchPage } = require("./page-objects/SearchPage");
const { HomePage } = require("./page-objects/HomePage");

test.describe("Search Tests", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.pageTitle();
  });

  test("Verify user is able to select product from navigation list", async ({
    page,
  }) => {
    const searchPage = new SearchPage(page);
    await searchPage.navigatetoProductDetailPage();
    await searchPage.pageHeader();
  });
});
