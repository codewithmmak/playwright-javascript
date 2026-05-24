const { test, expect } = require("./fixtures/testFixtures");
const { SearchPage } = require("./page-objects/SearchPage");
const { HomePage } = require("./page-objects/HomePage");
const { CartPage } = require("./page-objects/CartPage");

test.describe("Cart Tests", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.pageTitle();
  });

  test("Verify user is able to add product to Cart", async ({ page, testData, runtimeData }) => {
    const searchPage = new SearchPage(page, testData.catalog);
    await searchPage.navigatetoProductDetailPage();
    await searchPage.pageHeader();

    const cartPage = new CartPage(page, testData.catalog);
    await cartPage.addToCart();
    await cartPage.productInCart();

    expect(runtimeData.orderRef).toContain("ORD-");
  });
});
