const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const testData = require("../fixtures/testData.json");

async function saucedemoTest() {
    describe("Saucedemo Test", function () {
        let driver;
        let loginPage;
        let inventoryPage;

        beforeEach(async function () {
            this.timeout(30000);
            driver = await new Builder().forBrowser("chrome").build();
            loginPage = new LoginPage(driver);
            inventoryPage = new InventoryPage(driver);
            await loginPage.open(testData.baseUrl);
        });

        it("TC01-Login and Add Item to Cart", async function () {
            await loginPage.login(testData.validUser.username, testData.validUser.password);
            const titleText = await inventoryPage.getTitleText();
            assert.strictEqual(titleText.includes(testData.assertTitle), true, testData.titleError);
            
            await inventoryPage.addItemToCart();
            const cartBadge = await inventoryPage.getCartItemCount();
            assert.strictEqual(cartBadge, "1", "Item was not added to the cart");
        });

        it("TC02-Login Invalid", async function () {
            await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);
            const errorMessage = await loginPage.getErrorMessage();
            assert.strictEqual(errorMessage.includes(testData.message.expectedloginError), true, testData.message.loginError);
        });

        afterEach(async function () {
            const screenshotDir = path.join(__dirname, '../screenshot');
            if (!fs.existsSync(screenshotDir)) {
                fs.mkdirSync(screenshotDir);
            }
            const image = await driver.takeScreenshot();
            fs.writeFileSync(
                path.join(screenshotDir, `${this.currentTest.title
                    .replace(/\s+/g, '_')
                    .replace(/[^a-zA-Z0-9_]/g, "")}.png`
                ),
                image,
                "base64"
            );
            await driver.quit();
        });
    });
}

saucedemoTest();
