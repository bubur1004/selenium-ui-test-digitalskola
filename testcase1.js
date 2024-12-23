const { Builder, By, until } = require('selenium-webdriver');  // Add 'until' here
const LoginPage = require('./LoginPage.js');
const DashboardPage = require('./DashboardPage.js');
const assert = require('assert');
const CartPage = require('./CartPage.js');

let driver; // Declare driver globally to access it in all hooks and tests.

describe('test case 1', function () {

    this.timeout(10000);
    // Runs before the test suite starts
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // Runs before each test
    beforeEach(async function () {
        const loginPage = new LoginPage(driver); // Use the imported LoginPage class
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    // Assertion or validation
    it('Login success', async function () {
        const dashboardPage = new DashboardPage(driver); // Use the imported DashboardPage class
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");
        console.log("Test Passed: Title includes 'Swag Labs'");
        await dashboardPage.addToCart();
    });

    it('Cart Validation', async function () {
        const cartPage = new CartPage(driver); // Correct instance creation
        const productElement = await cartPage.isOnCart(); // Ensure the method returns the product element
    
        // Wait for product element to be visible (if necessary)
        await driver.wait(until.elementIsVisible(productElement), 5000);
    
        const productName = await productElement.getText();
        console.log("Actual Product Name:", productName); // Log the product name
    
        // Assert that the product name contains the expected string
        assert.strictEqual(productName.includes('Sauce Labs Backpack'), true, "Product is not Sauce Labs Backpack");
        console.log("Test Passed: Product is 'Sauce Labs Backpack'");
    });
    
    

    // Runs after the test suite finishes
    after(async function () {
        await driver.sleep(2000);
        await driver.quit();
    });
});
