import { Page, Locator, FrameLocator, expect } from '@playwright/test';

export class BasePage {
    protected page: Page;
    readonly noThanksButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.noThanksButton = page.getByRole('button', { name: 'No, thanks' });
        this.dismissPopup()
    }

    /**
     * Dismisses a popup by clicking the "No Thanks" button.
     *
     * This method sets up a handler for the popup and clicks on the "No Thanks" button to dismiss it.
     * It assumes that the "No Thanks" button is present in the DOM and is represented by the `noThanksButton` locator.
     * The handler is used to interact with the button asynchronously.
     *
     * @throws {Error} Throws an error if the button click operation fails.
     *
     * @example
     * ```typescript
     * await page.dismissPopup();
     * ```
     */

    async dismissPopup() {
        // Setup the handler for popup.
        await this.page.addLocatorHandler(this.noThanksButton, async () => {
            await this.noThanksButton.click();
        });
    }

}





