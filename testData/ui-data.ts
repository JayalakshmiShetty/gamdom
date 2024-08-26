// Define interfaces for the structure of the test data
interface HomePageData {
    searchTerm: string;
    expectedGameName: string;
}

interface SignInPageData {
    username: string;
    password: string;
}

interface SportsBettingPageData {
    oddsCount: number;
    errorMessage: string;
    unavailableGameMessage: string;
}

interface CasinoPageData {
    baselineScreenshotName: string;
    screenshotName: string;
    visualThreshold: number;
    maxDiffPixelRatio: number;
}

// Define a type for the entire test data object
interface TestData {
    homePage: HomePageData;
    signInPage: SignInPageData;
    sportsBettingPage: SportsBettingPageData;
    casinoPage: CasinoPageData;
}

// Create the test data object
export const testData: TestData = {
    homePage: {
        searchTerm: 'Rip City',
        expectedGameName: 'RIP City'
    },
    signInPage: {
        username: 'japoy86518',
        password: 'J2y2L@1990'
    },
    sportsBettingPage: {
        oddsCount: 3,
        errorMessage: 'Error',
        unavailableGameMessage: 'Game is currently unavailable'
    },
    casinoPage: {
        baselineScreenshotName: 'casino-page-baseline.png',
        screenshotName: 'casino-page.png',
        visualThreshold: 0.10,
        maxDiffPixelRatio: 0.20
    }
};