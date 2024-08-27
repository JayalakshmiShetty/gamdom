import { Page, Locator, FrameLocator } from '@playwright/test';
import {
    waitForTimeout,
    assertElementText
} from '../utils/ui-utils';
import {BasePage} from "./BasePage";

export class SportsBettingPage  extends BasePage{
    readonly sportBettingButton: Locator;
    readonly gameCurrentlyUnavailableText: Locator;
    readonly errorOnPlaceButton: Locator;
    readonly oddsButtonSelector: Locator;
    readonly placeBetButton: Locator;
    readonly iframe: FrameLocator;
    readonly titleName: Locator;

    /**
     * @constructor
     *
     * @param {Page} page - The Playwright Page object.
     *
     * @summary Initializes a new instance of the SportsBettingPage class, setting up locators for the page's elements, including iframes and buttons.
     */
    constructor(page: Page) {
        super(page)
        this.sportBettingButton = page.locator('a[href="/sports"] >> text=Visit Sportbook');
        this.iframe = page.frameLocator(".sb__iframe").frameLocator("#betsyframe");
        this.gameCurrentlyUnavailableText = this.iframe.locator('div.cover>h1');
        this.errorOnPlaceButton = this.iframe.locator('span.bet-error');
        this.oddsButtonSelector = this.iframe.locator('//div[@class="grid-line__content"]//button[contains(@class,"outcome")]');
        this.placeBetButton = this.iframe.locator('div.coupon__placebet button.btn.coupon__placebet-btn');
        this.titleName = this.iframe.locator("div.grid-line__title-main>span").first();
    }

    /**
     * @method selectOddsBasedOnOddCount
     *
     * @param {number} oddsCount - The number of odds buttons to select based on their count.
     *
     * @summary Waits for the odds buttons to be attached to the DOM and then clicks each of them up to the specified count.
     *
     * @returns {Promise<void>} - A promise that resolves when the specified number of odds buttons have been clicked.
     *
     * @throws {Error} Throws an error if an odds button cannot be clicked.
     */
    async selectOddsBasedOnOddCount(oddsCount: number) {
        await waitForTimeout(this.page, 2000);

        for (let i = 1; i <= oddsCount; i++) {
            const oddsButton = this.oddsButtonSelector.nth(i - 1);
            try {
                await oddsButton.waitFor({ state: 'attached', timeout: 120000 });
                await oddsButton.click();
            } catch (error) {
                console.error(`Failed to click the odds button at position ${i}:`, error);
                throw error; // Rethrow the error to fail the test
            }
        }
    }

    /**
     * @method placeBet
     *
     * @summary Waits for the 'Place Bet' button to be attached to the DOM and then clicks it.
     *
     * @returns {Promise<void>} - A promise that resolves when the 'Place Bet' button has been clicked.
     *
     * @throws {Error} Throws an error if the 'Place Bet' button cannot be clicked.
     */
    async placeBet() {
        await this.placeBetButton.waitFor({ state: 'attached', timeout: 100000 });
        await this.placeBetButton.click();
    }
    /**
     * @method isGameCurrentlyUnavailable
     *
     * @summary Checks if the "Game Currently Unavailable" text is visible on the page.
     *
     * @returns {Promise<boolean>} - A promise that resolves to `true` if the text is visible, otherwise `false`.
     */
    async isGameCurrentlyUnavailable(): Promise<boolean> {
        return await this.gameCurrentlyUnavailableText.isVisible();
    }

    /**
     * @method getGameCurrentlyUnavailableText
     *
     * @summary Retrieves the text content of the "Game Currently Unavailable" element.
     *
     * @returns {Promise<string>} - A promise that resolves to the trimmed text content of the element.
     */
    async getGameCurrentlyUnavailableText(): Promise<string> {
        const text = await this.gameCurrentlyUnavailableText.textContent();
        return text?.trim() || '';
    }
    /**
     * @method verifyErrorOnPlaceBetButton
     *
     * @param {string} expectedText - The expected text to verify on the error message element.
     *
     * @summary Asserts that the error message displayed on the place bet button matches the expected text.
     *
     * @returns {Promise<void>} - A promise that resolves when the assertion is complete.
     *
     * @throws {Error} Throws an error if the text on the error message element does not match the expected text.
     */
    async verifyErrorOnPlaceBetButton(expectedText: string) {
        await assertElementText(this.page, this.errorOnPlaceButton, expectedText);
    }
}
