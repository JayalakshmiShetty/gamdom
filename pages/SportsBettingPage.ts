
import { Page, Locator, FrameLocator } from '@playwright/test';
import {
    clickElement,
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

    async openSportBetting() {
        await clickElement(this.page, 'a[href="/sports"] >> text=Visit Sportbook');
    }

    async selectOddsBasedOnOddCount(oddsCount: number) {
        await waitForTimeout(this.page, 2000);

        for (let i = 1; i <= oddsCount; i++) {
            const oddsButton = this.oddsButtonSelector.nth(i - 1);
            try {
                await oddsButton.waitFor({ state: 'attached', timeout: 90000 });
                await oddsButton.click();
                await waitForTimeout(this.page, 2000);
            } catch (error) {
                console.error(`Failed to click the odds button at position ${i}:`, error);
                throw error; // Rethrow the error to fail the test
            }
        }
    }

    async placeBet() {
        await this.placeBetButton.waitFor({ state: 'attached', timeout: 100000 });
        await this.placeBetButton.click();
    }

    async isGameCurrentlyUnavailable(): Promise<boolean> {
        return await this.gameCurrentlyUnavailableText.isVisible();
    }

    async getGameCurrentlyUnavailableText(): Promise<string> {
        const text = await this.gameCurrentlyUnavailableText.textContent();
        return text?.trim() || '';
    }

    async verifyErrorOnPlaceBetButton(expectedText: string) {
        await assertElementText(this.page, this.errorOnPlaceButton, expectedText);
    }
}
