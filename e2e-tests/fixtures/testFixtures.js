const base = require("@playwright/test");
const { loadTestData } = require("../utils/testDataLoader");
const { generateUniqueEmail, generateOrderRef } = require("../utils/runtimeDataGenerator");

const test = base.test.extend({
  // Playwright requires fixture arg 1 to be object-destructured.
  // eslint-disable-next-line no-empty-pattern
  testData: async ({}, use) => {
    const data = loadTestData();
    await use(data);
  },
  runtimeData: async ({ testData }, use) => {
    const runtime = {
      uniqueEmail: generateUniqueEmail(testData.dataDefaults?.emailDomain),
      orderRef: generateOrderRef(),
    };
    await use(runtime);
  },
});

module.exports = {
  test,
  expect: base.expect,
};
