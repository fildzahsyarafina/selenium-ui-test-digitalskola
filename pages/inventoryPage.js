const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

class InventoryPage{
    constructor (driver){
        this.driver = driver
        this.appLogo = By.css(".app_logo");
        this.cartBadge = By.className("shopping_cart_badge");
        this.addToCartButton = By.id("add-to-cart-sauce-labs-backpack");
    }

    async getTitleText(){
        return await this.driver.findElement(this.appLogo).getText();
    }

    async addItemToCart() {
        await this.driver.findElement(this.addToCartButton).click();
    }

    async getCartItemCount() {
        return await this.driver.findElement(this.cartBadge).getText();
    }
}
 
module.exports = InventoryPage;