import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/SignInPage';
import { SportsBettingPage } from '../pages/SportsBettingPage';
import { join } from 'path';
import { testData } from '../testData/ui-data';
import {takeScreenshot, waitForTimeout} from '../utils/ui-utils';


const screenshotsPath = join(__dirname, 'screenshots');

test.beforeEach(async ({ page, browser }) => {
    await browser.newContext();
    const homePage = new HomePage(page);
    await homePage.navigateToGamdomSite();
    await homePage.handleFastlyCaptchaIfFound();
});

test('Verify Game Search functionality works', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.searchForGame(testData.homePage.searchTerm);
    await homePage.selectFirstResult();
    await homePage.interactWithWebglElement();
    await homePage.verifyGameName(testData.homePage.expectedGameName);
});

test('Should prevent bet placement while logged out', async ({ page }) => {
    // Navigate to the sports betting section
    const sportsPage = new SportsBettingPage(page);
    const homePage = new HomePage(page);

    await homePage.NavigateToSportsBetting();
    if (!await sportsPage.isGameCurrentlyUnavailable()) {
        await sportsPage.selectOddsBasedOnOddCount(testData.sportsBettingPage.oddsCount);
        await sportsPage.placeBet();
        await sportsPage.verifyErrorOnPlaceBetButton(testData.sportsBettingPage.errorMessage);
    } else {
        const messageText = await sportsPage.getGameCurrentlyUnavailableText();
        console.log('Unable to place bet: Text observed is', messageText);
    }
});

test('Verify CAPTCHA is Present but Hidden During Automated or Non-Human Sign-In', async ({ page }) => {
    const homePage = new HomePage(page);
    const signInPage = new SignInPage(page);
    // Note: This test has been observed to fail intermittently. The CAPTCHA might not always
    // be hidden as expected due to timing issues or variations in the automated sign-in process.
    // The failure is not consistent and might require additional debugging or adjustment.
    await homePage.clickOnSignInButton();
    await signInPage.signIn(testData.signInPage.username, testData.signInPage.password);
    await signInPage.verifyCaptchaIsAvailableAndHidden();
});

test('Should match the visual snapshot of the casino page', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.navigateToCasinoPage();
    const buttonCasinoGames = page.getByText("Casino Games");
    await buttonCasinoGames.waitFor({ state: 'visible', timeout: 60000 });
    await waitForTimeout(page, 2000)//Can be skipped for single test run.Necessary only for parallel run.
    const screenshotPath = join(screenshotsPath, testData.casinoPage.screenshotName);
    await takeScreenshot(page, screenshotPath);
    const baselineScreenshotPath = join(screenshotsPath, testData.casinoPage.baselineScreenshotName);
    await expect(page).toHaveScreenshot(baselineScreenshotPath, {
        threshold: testData.casinoPage.visualThreshold,
        maxDiffPixelRatio: testData.casinoPage.maxDiffPixelRatio,
    });
});

