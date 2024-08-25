import { Page, Locator, FrameLocator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
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
    readonly  buttonCapSubmit: Locator;
    readonly captchaText: Locator;


    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByPlaceholder("Search");
        this.noThanksButton = page.getByRole('button', { name: 'No, thanks' });
        this.sportBettingLink = page.locator('text=Sport Betting');
        this.casinoLink = page.getByText('Casino',{exact:true});
        this.firstResult = page.locator("li[class^='DropdownItem-styled']").first();
        this.iframe = page.frameLocator('#router-container iframe');
        this.webglElement = this.iframe.locator('#webgl');
        this.gameNameOverlay = this.iframe.locator('#GameNameOverlay');
        this.signInButton = page.getByRole('button', {name: "Sign in"}).first();
        this.inputAnswer = page.getByRole('button', {name: 'answer'});
        this.buttonCapSubmit = page.locator("#capSubmit")
        this.captchaText = page.locator('div#captcha-text');
    }


    async handleFastlyCaptchaIfFound(page){
        // Setup the handler for Fastly captcha.
        await page.addLocatorHandler(this.inputAnswer, async () => {
            const captchaText = await this.captchaText.innerText();  // Extract the CAPTCHA text
            await this.inputAnswer.fill(captchaText.trim());
            await this.buttonCapSubmit.click();
        });

    }
    async navigateToGamdomSite(){
        await this.page.goto('https://gamdom.com/');
    }
    async dismissPopup() {
    // Setup the handler for popup.
    await this.page.addLocatorHandler(this.noThanksButton, async () => {
        await this.noThanksButton.click();
    });
    }

    async searchForGame(query: string) {
        await this.searchInput.fill(query);
        await this.searchInput.click();
    }

    async clickSportBetting() {
        await this.sportBettingLink.click();
    }

    async clickCasino() {
        await this.casinoLink.click();
    }
    async selectFirstResult() {
        await this.firstResult.waitFor({ state: 'visible' });
        await this.firstResult.click();
    }

    async interactWithWebglElement() {
        await this.webglElement.waitFor({ state: 'attached', timeout: 60000 });
        await this.webglElement.click();
    }

    async verifyGameName(expectedName: string) {
        await expect(this.gameNameOverlay).toHaveText(expectedName);
    }

    async clickOnSignInButton() {
        await this.signInButton.click();
    }



}



 

