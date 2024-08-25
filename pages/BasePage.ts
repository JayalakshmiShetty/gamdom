import { Page, Locator, FrameLocator, expect } from '@playwright/test';

export class BasePage {
    protected page: Page;
    readonly noThanksButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.noThanksButton = page.getByRole('button', { name: 'No, thanks' });
        this.dismissPopup()

    }

    async dismissPopup() {
        // Setup the handler for popup.
        await this.page.addLocatorHandler(this.noThanksButton, async () => {
            await this.noThanksButton.click();
        });
    }

}





