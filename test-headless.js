const { Builder, By, Key, until } = require("selenium-webdriver")
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

async function saucedemoLoginTest() {
  // Menambahkan chrome option untuk menggunakan User-Agent yang menyerupai browser asli
  let options = new chrome.Options();
  options.addArguments("--headless=new");
  
  // Membuat koneksi dengan webdriver
  let driver = await new Builder().forBrowser("chrome").build();

  // Exception Handling & Conclusion
  try {
    // Buka URL di browser
    await driver.get("https://www.saucedemo.com"); 

    await driver.sleep(1000);
    await driver.findElement(By.id("user-name")).sendKeys("standard_user"); // Memasukkan username
    await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce"); //  Memasukkan password
    await driver.findElement(By.name("login-button")).click(); //lalu klik login

    // assertion/ menunggu hingga halaman dashboard muncul
    await driver.wait(until.elementLocated(By.className("app_logo")), 5000);

    await driver.sleep(2000);
    // Validasi bahwa user berada di halaman dashboard
    let titleText = await driver.findElement(By.css(".app_logo")).getText();
    assert.strictEqual(titleText.includes("Swag Labs"), true, 'Title does not include "Swag Labs"');

    // delay sebelum klik
    await driver.sleep(1000);  
    // menambahkan item ke keranjang
    await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
    // delay setelah klik
    await driver.sleep(1000);  

    // Validasi item berhasil ditambahkan ke keranjang
    const cartBadge = await driver.findElement(By.className("shopping_cart_badge")).getText();
    assert.strictEqual(cartBadge, "1", 'Item was not added to the cart');

    await driver.sleep(2000);  // menunggu 2 detik sebelum menutup browser
  } finally {
    await driver.quit();
  }
}

saucedemoLoginTest();