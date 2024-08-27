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

    /**
     * @constructor
     *
     * @param {Page} page - The Playwright Page object.
     *
     * @summary Initializes a new instance of the SignInPage class with locators for interacting with the sign-in page elements.
     */
    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByPlaceholder('Enter your username');
        this.passwordInput = page.getByPlaceholder('Enter your Password');
        this.loginButton = page.getByTestId('start-playing-login');
        this.captcha = page.locator('#turnstile-login');
        this.rememberMeCheckbox = page.getByTestId('remember-me-login');
    }

    /**
     * @method signIn
     *
     * @param {string} username - The username to enter into the username input field.
     * @param {string} password - The password to enter into the password input field.
     * @param {boolean} [rememberMe=false] - Optional. Indicates whether to check the 'Remember Me' checkbox. Defaults to `false`.
     *
     * @summary Fills in the username and password fields, optionally checks the 'Remember Me' checkbox, clicks the login button, and waits for the network to become idle.
     *
     * @returns {Promise<void>} - A promise that resolves when the sign-in process is complete.
     */
    async signIn(username: string, password: string, rememberMe = false) {
        await fillInputField(this.usernameInput, username);
        await fillInputField(this.passwordInput, password);
        if (rememberMe) {
            await this.rememberMeCheckbox.check();
        }
        await this.loginButton.click();
        await waitForNetworkIdle(this.page);
    }

    /**
     * @method verifyCaptchaIsAvailableAndHidden
     *
     * @summary Verifies that the captcha element is present on the page and ensures that it is hidden. Waits up to 50 seconds for the captcha to become hidden.
     *
     * @returns {Promise<void>} - A promise that resolves when the captcha visibility check is complete.
     */
    async verifyCaptchaIsAvailableAndHidden() {
        await assertElementIsHidden(this.captcha, 50000);
        await assertElementCount(this.captcha, 1);
    }
}
