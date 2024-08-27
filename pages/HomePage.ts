import { Page, Locator, FrameLocator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import {
    waitForElementToBeVisible,
    typeInInputField,
    assertElementText,
    navigateToUrl, clickElement,
    waitForPageLoad,
    waitForElementToBeNotPresent
} from '../utils/ui-utils';

export class HomePage extends BasePage {
    readonly searchInput: Locator;
    readonly noThanksButton: Locator;
    readonly sportBettingLink: Locator;
    readonly casinoLink: Locator;
    readonly firstResult: Locator;
    readonly iframe: FrameLocator;
    readonly webglElement: Locator;
    readonly gameNameOverlay: Locator;
    readonly signInButton: Locator;
    readonly inputAnswer: Locator;
    readonly buttonCapSubmit: Locator;
    readonly captchaText: Locator;
    readonly loaderImage: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = page.getByPlaceholder('Search');
        this.noThanksButton = page.getByRole('button', { name: 'No, thanks' });
        this.sportBettingLink = page.locator('text=Sport Betting');
        this.casinoLink = page.getByText('Casino', { exact: true }).first();
        this.firstResult = page.locator("li[class^='DropdownItem-styled']").first();
        this.iframe = page.frameLocator('#router-container iframe');
        this.webglElement = this.iframe.locator('#webgl');
        this.gameNameOverlay = this.iframe.locator('#GameNameOverlay');
        this.signInButton = page.getByRole('button', { name: 'Sign in' }).first();
        this.inputAnswer = page.getByRole('button', { name: 'answer' });
        this.buttonCapSubmit = page.locator('#capSubmit');
        this.captchaText = page.locator('div#captcha-text');
        this.loaderImage= page.locator('div.sc-hnmNqB.cAOoWx svg')
    }

    /**
     * Handles Fastly captcha by filling the CAPTCHA text and submitting.
     */
    async handleFastlyCaptchaIfFound(){
        // Setup the handler for Fastly captcha.
        await this.page.addLocatorHandler(this.inputAnswer, async () => {
            const captchaText = await this.captchaText.innerText();  // Extract the CAPTCHA text
            await this.inputAnswer.fill(captchaText.trim());
            await this.buttonCapSubmit.click();
        });

    }

    /**
     * Navigates to the Gamdom website.
     */
    async navigateToGamdomSite(): Promise<void> {
        await navigateToUrl(this.page, 'https://gamdom.com/');
        await waitForElementToBeNotPresent(this.page, this.loaderImage)
        await waitForPageLoad(this.page)
    }


    /**
     * Searches for a game by typing the query into the search input.
     *
     * @param query - The search query.
     */
    async searchForGame(query: string): Promise<void> {
        await typeInInputField(this.searchInput, query, 100);
        await this.searchInput.click(); // Click to ensure the search is executed
        await waitForElementToBeNotPresent(this.page, this.loaderImage)
        await waitForPageLoad(this.page)
    }

    /**
     * Clicks the "Visit Sportsbook" link.
     */
    async NavigateToSportsBetting() {
        await clickElement(this.page, 'a[href="/sports"] >> text=Visit Sportbook');
        await waitForElementToBeNotPresent(this.page, this.loaderImage)
        await waitForPageLoad(this.page)
    }


    // Actions
    /**
     * Navigates to the Casino page by clicking the casino button and waiting for the casino games button to be attached.
     */
    async navigateToCasinoPage(): Promise<void> {
        try {
            await this.casinoLink.click();
            await waitForElementToBeNotPresent(this.page, this.loaderImage)
            await waitForPageLoad(this.page)
        } catch (error) {
            throw new Error(`Failed to navigate to the Casino page: ${error.message}`);
        }
    }

    /**
     * Selects the first result from the dropdown.
     */
    async selectFirstResult(): Promise<void> {
        await waitForElementToBeVisible(this.firstResult);
        await this.firstResult.click();
    }

    /**
     * Interacts with the WebGL element by waiting for it to be attached and then clicking it.
     */
    async interactWithWebglElement(): Promise<void> {
        await this.webglElement.waitFor({ state: 'attached', timeout: 120000 });
        await this.webglElement.click();
    }

    /**
     * Verifies that the game name overlay contains the expected text.
     *
     * @param expectedName - The expected game name.
     */
    async verifyGameName(expectedName: string): Promise<void> {
        await assertElementText(this.page, this.gameNameOverlay, expectedName);
    }

    /**
     * Clicks the "Sign in" button.
     */
    async clickOnSignInButton(): Promise<void> {
        try {
        await this.signInButton.click();
        } catch (error) {
            throw new Error(`Failed to click on Sign in button: ${error.message}`);
        }
    }
}
