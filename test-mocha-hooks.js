const { Builder, By, until, Key } = require("selenium-webdriver");
const assert = require("assert");

async function saucedemoLoginTest() {
  describe("Saucedemo Login Test", function (){
    let driver;
    let browserName = "chrome";

    beforeEach(async function () {
      // Menambahkan timeout
      this.timeout(30000); // 10.000 ms = 10 detik

      // Membuat koneksi dengan webdriver
      driver = await new Builder().forBrowser(browserName).build();
      await driver.get("https://saucedemo.com");
      //simpan cookie
      cookies = await driver.manage().getCookies();
    });

    it("TC01-Login Success", async function (){
      await driver.findElement(By.id("user-name")).sendKeys("standard_user"); // Memasukkan username
      await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce"); //  Memasukkan password
      await driver.findElement(By.name("login-button")).click(); //lalu klik login
      await driver.wait(until.elementLocated(By.className("app_logo")), 5000); //menunggu muncul dashborad

      //assertion
      let titleText = await driver.findElement(By.css(".app_logo")).getText();
      assert.strictEqual(
        titleText.includes("Swag Lab"),
        true,
        'Title does not include "Swag Labs"'
      );
      console.log("Testing Login Success!");
    });

    it("TC02 - Add Item to Cart", async function(){
      this.timeout(30000);
      await driver.findElement(By.id("user-name")).sendKeys("standard_user"); // Memasukkan username
      await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce"); //  Memasukkan password
      await driver.findElement(By.name("login-button")).click(); //lalu klik login
      await driver.wait(until.elementLocated(By.className("app_logo")), 5000); //menunggu muncul dashborad

      // delay sebelum klik
      await driver.sleep(1000);  
      // menambahkan item ke keranjang
      await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
      // delay setelah klik
      await driver.sleep(1000);

      // Validasi item berhasil ditambahkan ke keranjang
      const cartBadge = await driver.findElement(By.className("shopping_cart_badge")).getText();
      assert.strictEqual(cartBadge, "1", 'Item was not added to the cart');
    });
    afterEach(async function () {
      await driver.quit();
    });

  })
}
saucedemoLoginTest();