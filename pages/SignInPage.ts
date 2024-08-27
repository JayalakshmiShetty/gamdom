import { Page, Locator } from '@playwright/test';
import { BasePage } from "./BasePage";
import {
    waitForNetworkIdle,
    fillInputField,
    assertElementIsHidden,
    assertElementCount
} from '../utils/ui-utils'; // Adjust this path if necessary

export class SignInPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly captcha: Locator;
    readonly rememberMeCheckbox: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByPlaceholder('Enter your username');
        this.passwordInput = page.getByPlaceholder('Enter your Password');
        this.loginButton = page.getByTestId('start-playing-login');
        this.captcha = page.locator('#turnstile-login');
        this.rememberMeCheckbox = page.getByTestId('remember-me-login');
    }

    async signIn(username: string, password: string, rememberMe = false) {
        await fillInputField(this.usernameInput, username);
        await fillInputField(this.passwordInput, password);
        if (rememberMe) {
            await this.rememberMeCheckbox.check();
        }
        await this.loginButton.click();
        await waitForNetworkIdle(this.page);
    }

    async verifyCaptchaIsAvailableAndHidden() {
        await assertElementIsHidden(this.captcha, 50000);
        await assertElementCount(this.captcha, 1);
    }
}
