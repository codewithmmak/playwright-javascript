const { test, expect } = require("./fixtures/testFixtures");
const { SearchPage } = require("./page-objects/SearchPage");
const { HomePage } = require("./page-objects/HomePage");

test.describe("Search Tests", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.pageTitle();
  });

  test("Verify user is able to select product from navigation list", async ({ page, testData, runtimeData }) => {
    const searchPage = new SearchPage(page, testData.catalog);
    await searchPage.navigatetoProductDetailPage();
    await searchPage.pageHeader();

    // Runtime data is generated per test and can be reused for API/order workflows.
    expect(runtimeData.uniqueEmail).toContain(`@${testData.dataDefaults.emailDomain}`);
    expect(runtimeData.orderRef).toContain("ORD-");
  });
});
