// tslint:disable:no-implicit-dependencies
import "expect-puppeteer";

test("can open", async () => {
  await page.goto("http://localhost:8888/");
  await expect(page).toMatch("Learn React");
});
