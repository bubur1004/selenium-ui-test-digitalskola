const assert = require('assert');
const { Builder, By, Key, until} = require('selenium-webdriver');
const { elementIsVisible } = require('selenium-webdriver/lib/until');
const { finished } = require('stream');

async function saucedemo() {
    //jalanin browser
    let driver = await new Builder().forBrowser('chrome').build();

    try{
        await driver.get("https://www.saucedemo.com");
        await driver.wait(until.elementLocated(By.xpath("//input[@id='user-name']")));

        let username = await driver.findElement(By.xpath("//input[@id='user-name']"));
        await username.sendKeys("standard_user");
        let password = await driver.findElement(By.xpath("//input[@id='password']"));
        await password.sendKeys("secret_sauce");
        let login_button = await driver.findElement(By.xpath("//input[@id='login-button']"));
        await login_button.click();


        let titleElement = await driver.findElement(By.xpath("//div[@class='app_logo']"));
        let title = await titleElement.getText();
        console.log("Title Text:", title);
        assert.strictEqual(title.includes('Swag Labs'), true, "Title does not include 'Swag Labs'")
        console.log("Test Passed: Title includes 'Swag Labs'");

        let backpackCart = await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']"))
        await backpackCart.click();

        let bikeLight = await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-bike-light']"))
        await bikeLight.click();
        
        let cart = await driver.findElement(By.xpath("//span[@class='shopping_cart_badge']"))
        await cart.click();

        await driver.wait(until.elementLocated(By.xpath("//button[@id='checkout']")));

        checkout = await driver.findElement(By.xpath("//button[@id='checkout']"))
        await checkout.click();

        await driver.wait(until.elementLocated(By.xpath("//input[@id='continue']")));

        firstname = await driver.findElement(By.xpath("//input[@id='first-name']"))
        await firstname.sendKeys("rizky");

        lastname = await driver.findElement(By.xpath("//input[@id='last-name']"))
        await lastname.sendKeys("syarif");

        zipcode = await driver.findElement(By.xpath("//input[@id='postal-code']"))
        await zipcode.sendKeys("12345");

        clickContinue = await driver.findElement(By.xpath("//input[@id='continue']"))
        await clickContinue.click();

        await driver.wait(until.elementLocated(By.xpath("//button[@id='finish']")));
        finishclick = await driver.findElement(By.xpath("//button[@id='finish']"))
        await finishclick.click();

        await driver.wait(until.elementLocated(By.xpath("//button[@id='back-to-products']")));
    }

    catch (error) {
        console.error("Test Failed:", error.message);
    }
    finally{
        await driver.sleep(5000);
        await driver.quit();

    }
}

saucedemo();