// tslint:disable-next-line:no-implicit-dependencies
import { Page } from 'puppeteer';

declare const page: Page;
declare const host: string;

describe('App', () => {
  beforeAll(async () => {
    await page.goto(`http://${host}/`);
  });

  it('should display "Welcome to React" text on page', async () => {
    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain('Welcome to React');
  });

  it('should alert when clicks "React" button', async () => {
    let showsAlert = false;
    page.on('dialog', async dialog => {
      await dialog.dismiss();
      expect(dialog.type()).toBe('alert');
      showsAlert = true;
    });
    await page.click('button');
    expect(showsAlert).toBe(true);
  });
});
