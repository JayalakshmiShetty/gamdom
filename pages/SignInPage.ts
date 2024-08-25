import { Page, Locator, expect } from '@playwright/test';
import {BasePage} from "./BasePage";

export class SignInPage extends BasePage{
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly captcha: Locator;

    constructor(page: Page) {
        super(page)
        this.usernameInput = page.getByPlaceholder('Enter your username');
        this.passwordInput = page.getByPlaceholder('Enter your Password');
        this.loginButton = page.getByTestId('start-playing-login');
        this.captcha = page.locator('#turnstile-login');
    }

    async signIn(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyCaptchaIsAvailableAndHidden() {
        await expect(this.captcha).toBeHidden({ timeout: 50000 });
        await expect(this.captcha).toHaveCount(1); // Ensures that there is exactly one such element
    }
}
