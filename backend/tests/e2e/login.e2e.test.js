const { Builder, By, until } = require("selenium-webdriver");

jest.setTimeout(60000);

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

    const emailInput = await driver.wait(
      until.elementLocated(By.id("email")),
      10000
    );
    await emailInput.sendKeys("admin@email.com");

    const senhaInput = await driver.wait(
      until.elementLocated(By.id("senha")),
      10000
    );
    await senhaInput.sendKeys("123456");

    const btnLogin = await driver.wait(
      until.elementLocated(By.id("btn-login")),
      5000
    );
    await btnLogin.click();

    await driver.wait(until.urlContains("/dashboard"), 10000);

    const url = await driver.getCurrentUrl();
    expect(url).toContain("/dashboard");
  });

  test("login inválido", async () => {
    await driver.get("http://localhost:3000/login");

    const emailInput = await driver.wait(
      until.elementLocated(By.id("email")),
      10000
    );
    await emailInput.sendKeys("erro@email.com");

    const senhaInput = await driver.wait(
      until.elementLocated(By.id("senha")),
      10000
    );
    await senhaInput.sendKeys("senha_incorreta");

    const btnLogin = await driver.wait(
      until.elementLocated(By.id("btn-login")),
      5000
    );
    await btnLogin.click();

    const erroMsg = await driver.wait(
      until.elementLocated(By.id("erro-login")),
      10000
    );
    expect(await erroMsg.getText()).toBe("Usuário ou senha inválidos");
  });
});
