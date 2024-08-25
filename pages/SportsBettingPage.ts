// import {expect, Locator, Page} from '@playwright/test';
//
// export class SportsBettingPage {
//     private page: Page;
//
//     constructor(page: Page) {
//         this.page = page;
//
//     }
//
//     // Selectors
//     private get sportBettingButton() {
//         return this.page.locator('a[href="/sports"] >> text=Visit Sportbook');
//     }
//
//     private get gameCurrentlyUnavailableText() {
//         return this.page.frameLocator("sb__iframe").locator("div.cover>h1")
//     }
//     private get errorOnPlaceButton() {
//         return this.page.locator("span.bet-error")
//     }
//
//     // private get oddsButtonSelector() {
//     //     return (oddPosition: number) =>
//     //         this.page.locator(`(//div[@class='grid-line__content']//button[contains(@class,'outcome')])[${oddPosition}]`);
//     // }
//
//     private get oddsButtonSelector() {
//         return this.page.locator(`(//div[@class='grid-line__content']//button[contains(@class,'outcome')])`);
//     }
//
//     // Actions
//     async openSportBetting() {
//         await this.sportBettingButton.click();
//         await this.page.waitForTimeout(5000)
//     }
//
//     // private get placeBetButton() {
//     //     return this.page.locator("button>div.progress-bar"); // Replace with actual selector
//     // }
//
//     private get placeBetButton() {
//         return this.page.frameLocator("sb__iframe").locator("div.live-events-widget button.btn.coupon__placebet-btn"); // Replace with actual selector
//     }
//
//     // async selectOddsBasedOnOddCount(oddsCount: number) {
//     //     await this.page.waitForTimeout(3000)
//     //     for (let i = 1; i <= oddsCount; i++) {
//     //         const oddButton = this.oddsButtonSelector(i)
//     //         await oddButton.click();
//     //     }
//     // }
//     async selectOddsBasedOnOddCount(oddsCount: number) {
//         await this.page.waitForTimeout(3000)
//         const oddsButton = this.oddsButtonSelector
//         try {
//             // Wait for the button to be visible and enabled before clicking
//             await oddsButton.waitFor({ state: 'visible', timeout: 90000 }); // Adjust timeout as needed
//             await oddsButton.waitFor({ state: 'attached', timeout: 90000 });
//
//             // Click the button
//             await oddsButton.click();
//
//             // Optionally, wait for some post-click state if necessary
//             await this.page.waitForTimeout(2000); // Adjust as needed
//
//         } catch (error) {
//             console.error(`Failed to click the odds button at position :`, error);
//             throw error; // Rethrow the error to fail the test
//         }
//
//     }
//
//     async placeBet() {
//         // Ensure bet button is visible and enabled before clicking
//         await this.placeBetButton.waitFor({ state: 'visible', timeout: 90000 });
//         await this.placeBetButton.click();
//     }
//
//     async isGameCurrentlyUnavailable(): Promise<boolean> {
//         // Check if the "Game Currently Unavailable" text is visible
//         return await this.gameCurrentlyUnavailableText.isVisible();
//     }
//
//     async getGameCurrentlyUnavailableText(): Promise<string> {
//         // Return the text content of the "Game Currently Unavailable" element
//         const text = await this.gameCurrentlyUnavailableText.textContent();
//         return text?.trim() || '';
//     }
//
//     async verifyErrorOnPlaceBetButton(expectedText) {
//         await expect(this.errorOnPlaceButton).toHaveText(expectedText);
//     }
//
//
//     // async selectOddsBasedOnOddCount(page, oddsCount:number){
//     //     for (let i=1; i<=oddsCount;i++){
//     //         await page.locator("(//div[@class='grid-line__content']//button[contains(@class,'outcome')])["+i+"]").click()
//     //     }
//     // }
//     //
//     // async placeBet() {
//     //     // Attempt to place a bet
//     //     const placeBetButton = page.locator("button>div.progress-bar"); // Replace with actual selector
//     //     await placeBetButton.click();
//     // }
//     //
//
// }
import { Page, Locator, FrameLocator, expect } from '@playwright/test';

export class SportsBettingPage {
    readonly page: Page;
    readonly sportBettingButton: Locator;
    readonly gameCurrentlyUnavailableText: Locator;
    readonly errorOnPlaceButton: Locator;
    readonly oddsButtonSelector: Locator;
    readonly placeBetButton: Locator;
    readonly iframe: FrameLocator;
    readonly titleName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sportBettingButton = page.locator('a[href="/sports"] >> text=Visit Sportbook');
        this.iframe = page.frameLocator('div#betsyGameFrame iframe');
        this.gameCurrentlyUnavailableText = this.iframe.locator('div.cover>h1');
        this.errorOnPlaceButton = this.iframe.locator('span.bet-error');
        this.oddsButtonSelector = this.iframe.locator('//div[@class="grid-line__content"]//button[contains(@class,"outcome")]');
        this.placeBetButton = this.iframe.locator('div.live-events-widget button.btn.coupon__placebet-btn').first();
        this.titleName =this.iframe.locator("div.grid-line__title-main>span").first()

    }

    async openSportBetting() {
        await this.sportBettingButton.click();
        await this.page.waitForTimeout(5000); // Adjust timeout if needed
    }

    async selectOddsBasedOnOddCount(oddsCount: number) {
        await this.page.waitForTimeout(3000); // Adjust timeout if needed

        for (let i = 1; i <= oddsCount; i++) {
            const oddsButton = this.oddsButtonSelector.nth(i - 1);
            try {
                // Wait for the button to be visible and enabled before clicking
                await oddsButton.waitFor({ state: 'visible', timeout: 90000 }); // Adjust timeout if needed
                await oddsButton.waitFor({ state: 'attached', timeout: 90000 });

                // Click the button
                await oddsButton.click();

                // Optionally, wait for some post-click state if necessary
                await this.page.waitForTimeout(2000); // Adjust timeout if needed

            } catch (error) {
                console.error(`Failed to click the odds button at position ${i}:`, error);
                throw error; // Rethrow the error to fail the test
            }
        }
    }

    async placeBet() {
        // Ensure bet button is visible and enabled before clicking
        await this.titleName.waitFor({ state: 'attached', timeout: 120000 });

        await this.placeBetButton.waitFor({ state: 'attached', timeout: 120000 });
        await this.placeBetButton.click();
    }

    async isGameCurrentlyUnavailable(): Promise<boolean> {
        // Check if the "Game Currently Unavailable" text is visible
        return await this.gameCurrentlyUnavailableText.isVisible();
    }

    async getGameCurrentlyUnavailableText(): Promise<string> {
        // Return the text content of the "Game Currently Unavailable" element
        const text = await this.gameCurrentlyUnavailableText.textContent();
        return text?.trim() || '';
    }

    async verifyErrorOnPlaceBetButton(expectedText: string) {
        await expect(this.errorOnPlaceButton).toHaveText(expectedText);
    }


}

