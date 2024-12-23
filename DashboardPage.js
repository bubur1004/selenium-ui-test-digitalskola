const { By } = require('selenium-webdriver');

class DashboardPage{
    constructor(driver){
        this.driver = driver;

    }

    async isOnDashboard(){
        const title = await this.driver.findElement(By.xpath("//div[@class='app_logo']"));
        return title.getText();

    }

    async addToCart(){
        const backpack = await this.driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']"));
        await backpack.click();
    }
}

module.exports = DashboardPage;