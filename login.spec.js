const {By, Builder, Browser} = require('selenium-webdriver');
const assert = require("assert");

(async function loginTest() {
    let driver;

    try {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
        await driver.get('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        let title = await driver.getTitle();
        assert.equal("OrangeHRM", title);

        await driver.manage().setTimeouts({implicit : 500});

        let usernameBox = await driver.findElement(By.name('username'));
        let passwordBox = await driver.findElement(By.name('password'))
        let submitButton = await driver.findElement(By.css('button'));

        await usernameBox.sendKeys('Admin')
        await passwordBox.sendKeys('admin123');
        await submitButton.click();

        let dashboardPage = await driver.findElement(By.css('h6'));
        let value = await dashboardPage.getText();
        assert.equal("Dashboard", value);
    } catch(e) {
        console.log(e)
    } finally {
        await driver.quit();
    }
} ())