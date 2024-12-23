const { By, until } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
    }

    async isOnCart() {
        // Click the cart icon to navigate to the cart
        const cartIcon = await this.driver.findElement(By.xpath("//a[@class='shopping_cart_link']"));
        await cartIcon.click();

        // Wait for the product name element to be located on the cart page
        await this.driver.wait(until.elementLocated(By.xpath("//div[@class='inventory_item_name']")), 5000);

        // Return the product element
        return this.driver.findElement(By.xpath("//div[@class='inventory_item_name']"));
    }
}

module.exports = CartPage;
