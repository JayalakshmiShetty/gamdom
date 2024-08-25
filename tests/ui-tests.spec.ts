
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/SignInPage';
import { SportsBettingPage } from '../pages/SportsBettingPage';
import { CasinoPage } from '../pages/CasinoPage';
import { join } from 'path';


const screenshotsPath = join(__dirname, 'screenshots');

test.beforeEach(async ({ page, browser }) => {
    await browser.newContext();
    const homePage = new HomePage(page);
    await homePage.navigateToGamdomSite()
    await homePage.handleFastlyCaptchaIfFound(page)
    await homePage.dismissPopup();

});

test('Verify Search functionality works', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.searchForGame('Rip City');
    await homePage.selectFirstResult();
    await homePage.interactWithWebglElement();
    await homePage.verifyGameName('RIP City');
});

// test('Should prevent bet placement while logged out', async ({ page }) => {
//     // Navigate to the sports betting section
//     let oddsCount=3
//     const homePage = new HomePage(page);
//     const sportsPage = new SportsBettingPage(page);
//     await sportsPage.openSportBetting();
//     // await homePage.dismissPopup()
//     console.log("game is>>>>>>>++++++++++"+await sportsPage.isGameCurrentlyUnavailable())
//     if (!await sportsPage.isGameCurrentlyUnavailable()) {
//         // await homePage.dismissPopup()
//         // await sportsPage.selectOddsBasedOnOddCount(oddsCount);
//         await sportsPage.placeBet()
//         await sportsPage.verifyErrorOnPlaceBetButton("Error")
//     }else
//     {
//         const messageText = await sportsPage.getGameCurrentlyUnavailableText();
//         console.log('Unable to place bet: Text observed is', messageText);
//     }
// });


test('Verify Captcha is shown on SignIn', async ({ page }) => {
    const homePage = new HomePage(page);
    const signInPage = new SignInPage(page);
    await homePage.clickOnSignInButton()
    await signInPage.signIn('japoy86518', 'J2y2L@1990');
    await signInPage.verifyCaptchaVisible();

});

test('should match the visual snapshot of the casino page', async ({ page }) => {
    const casinoPage = new CasinoPage(page);
    await casinoPage.navigateToCasinoPage();
    const buttonCasinoGames = page.getByText("Casino Games")
    await buttonCasinoGames.waitFor({ state: 'visible', timeout: 60000 });
    await page.waitForTimeout(1000);
    const screenshotPath = join(screenshotsPath, 'casino-page.png');
    await casinoPage.takeScreenshot(screenshotPath);
    const baselineScreenshotPath = join(screenshotsPath, 'casino-page-baseline.png');
    await expect(page).toHaveScreenshot(baselineScreenshotPath, {
        threshold: 0.10, // 10% difference allowed
        maxDiffPixelRatio: 0.20, // Maximum allowed difference between the images
    });
});
