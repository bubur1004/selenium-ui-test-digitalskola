const { By } = require('selenium-webdriver');

class LoginPage {
    constructor(driver){
        this.driver = driver;
        this.usernameInput = By.xpath("//input[@id='user-name']");
        this.passwordInput = By.xpath("//input[@id='password']");
        this.loginbutton = By.xpath("//input[@id='login-button']");

    }
    async navigate(){
        await this.driver.get("https://www.saucedemo.com");

    }
    async login(username, password){
        await this.driver.findElement(this.usernameInput).sendKeys(username);
        await this.driver.findElement(this.passwordInput).sendKeys(password);
        await this.driver.findElement(this.loginbutton).click();

    }

}

module.exports = LoginPage;