const { devices } = require('@playwright/test')

// Playwright config to run tests on LambdaTest platform and local
const config = {
    testDir: 'e2e-tests',
    testMatch: '**/*.spec.js',
    timeout: 60000,
    use: {},
    projects: [
        // -- LambdaTest Config --
        // name in the format: browserName:browserVersion:platform@lambdatest
        // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
        // Use additional configuration options provided by Playwright if required: https://playwright.dev/docs/api/class-testconfig
        {
            name: 'chrome:latest:MacOS Catalina@lambdatest',
            use: {
                viewport: { width: 1920, height: 1080 }
            }
        },
        {
            name: 'chrome:latest:Windows 10@lambdatest',
            use: {
                viewport: { width: 1280, height: 720 }
            }
        },
        {
            name: 'MicrosoftEdge:90:Windows 10@lambdatest',
            use: {
                ...devices['iPhone 12 Pro Max']
            }
        },
        {
            name: 'pw-firefox:latest:Windows 10@lambdatest',
            use: {
                viewport: { width: 1280, height: 720 }
            }
        },
        {
            name: 'pw-webkit:latest:Windows 10@lambdatest',
            use: {
                viewport: { width: 1920, height: 1080 }
            }
        }

    ]
}

module.exports = config