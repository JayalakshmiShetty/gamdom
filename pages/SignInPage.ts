import { Page, Locator, expect } from '@playwright/test';

export class SignInPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly captcha: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Enter your username');
        this.passwordInput = page.getByPlaceholder('Enter your Password');
        this.loginButton = page.getByTestId('start-playing-login');
        this.captcha = page.locator('#turnstile-login');
    }

    async signIn(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyCaptchaVisible() {
        await expect(this.captcha).toBeVisible({ timeout: 15000 });
    }
}
