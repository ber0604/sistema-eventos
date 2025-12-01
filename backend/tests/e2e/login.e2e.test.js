const { Builder, By, until } = require("selenium-webdriver");

jest.setTimeout(30000);

describe("E2E Login", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  test("login válido", async () => {
    await driver.get("http://localhost:3000/login");

    await driver.findElement(By.id("email")).sendKeys("admin@email.com");
    await driver.findElement(By.id("senha")).sendKeys("123456");

    await driver.findElement(By.id("btn-login")).click();

    await driver.wait(until.urlContains("/dashboard"), 5000);

    const url = await driver.getCurrentUrl();
    expect(url).toContain("/dashboard");
  });

  test("login inválido", async () => {
    await driver.get("http://localhost:3000/login");

    await driver.findElement(By.id("email")).sendKeys("erro@email.com");
    await driver.findElement(By.id("senha")).sendKeys("senha_incorreta");

    await driver.findElement(By.id("btn-login")).click();

    const msg = await driver.wait(
      until.elementLocated(By.id("erro-login")),
      5000
    );

    expect(await msg.getText()).toBe("Usuário ou senha inválidos");
  });
});
