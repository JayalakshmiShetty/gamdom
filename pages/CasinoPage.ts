import { Page } from '@playwright/test';
import { join } from 'path';

export class CasinoPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Selectors
    private get casinoButton() {
        return this.page.getByText("Casino", {exact:true}).first();
    }

    private get casinoGamesButton() {
        return this.page.getByText("Casino Games");
    }

    // Actions
    async navigateToCasinoPage() {
        await this.casinoButton.click();
        await this.casinoGamesButton.waitFor({ state: 'attached', timeout: 60000 });
        await this.page.waitForTimeout(2000); // 2 seconds
    }

    async takeScreenshot(screenshotPath:string) {
        await this.page.screenshot({ path: screenshotPath });
    }

}
