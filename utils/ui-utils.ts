import {Page, Locator, expect} from '@playwright/test';

/**
 * Performs an action on a locator identified by a CSS selector.
 *
 * @param page - The Playwright Page object.
 * @param selector - The CSS selector for the element.
 * @param action - An async function to perform on the locator.
 */
export async function handleLocator(
    page: Page,
    selector: string,
    action: (locator: Locator) => Promise<void>
): Promise<void> {
    // Create a locator instance from the selector
    const locator = page.locator(selector);

    // Perform the action on the locator
    await action(locator);
}

/**
 * Clicks an element identified by a selector on a given page.
 *
 * @param {Page} page - The Playwright Page object.
 * @param {string} locator - The CSS selector for the element to be clicked.
 * @throws {Error} Throws an error if the click operation fails.
 */
export async function clickElement(page: Page, locator: string): Promise<void> {
    try {
        // Get the element using the locator and click it
        const element: Locator = page.locator(locator);
        await element.click();
    } catch (error) {
        // Throw an error if the click operation fails
        throw new Error(`Failed to click the element with locator '${locator}': ${error.message}`);
    }
}

/**
 * Waits for an element to be attached to the DOM.
 *
 * @param {Page} page - The Playwright Page object.
 * @param {string} locator - The CSS selector for the element to wait for.
 * @param {number} timeout - The maximum time to wait in milliseconds.
 * @throws {Error} Throws an error if the wait operation times out.
 */
export async function waitForElementToBeAttached(page: Page, locator: string, timeout: number = 60000): Promise<void> {
    try {
        // Get the element using the locator
        const element: Locator = page.locator(locator);

        // Wait for the element to be attached to the DOM
        await element.waitFor({ state: 'attached', timeout });
    } catch (error) {
        // Throw an error if the wait operation fails
        throw new Error(`Failed to wait for the element with locator '${locator}' to be attached: ${error.message}`);
    }
}

/**
 * Waits for a specified amount of time.
 *
 * @param {Page} page - The Playwright Page object.
 * @param {number} timeout - The time to wait in milliseconds.
 * @throws {Error} Throws an error if the wait operation fails.
 */
export async function waitForTimeout(page: Page, timeout: number): Promise<void> {
    try {
        // Wait for the specified amount of time
        await page.waitForTimeout(timeout);
    } catch (error) {
        // Throw an error if the wait operation fails
        throw new Error(`Failed to wait for ${timeout} milliseconds: ${error.message}`);
    }
}

/**
 * Takes a screenshot of the current page and saves it to the specified path.
 *
 * @param {Page} page - The Playwright Page object.
 * @param {string} screenshotPath - The file path where the screenshot will be saved.
 * @throws {Error} Throws an error if the screenshot operation fails.
 */
export async function takeScreenshot(page: Page, screenshotPath: string): Promise<void> {
    try {
        // Take a screenshot and save it to the specified path
        await page.screenshot({ path: screenshotPath });
    } catch (error) {
        // Throw an error if the screenshot operation fails
        throw new Error(`Failed to take screenshot and save it to '${screenshotPath}': ${error.message}`);
    }
}

/**
 * Asserts that a given element contains the expected text.
 *
 * @param {Page} page - The Playwright Page object.
 * @param {Locator} element - The Playwright Locator object for the element to be checked.
 * @param {string} expectedText - The expected text that should be present in the element.
 * @throws {Error} Throws an error if the actual text does not match the expected text.
 */
export async function assertElementText(page: Page, element: Locator, expectedText: string): Promise<void> {
    try {
        // Get the actual text from the element and assert it matches the expected text
        await expect(element, { message: `Actual (${await element.innerText()}) and Expected (${expectedText}) don't match.` }).toHaveText(expectedText);
    } catch (error) {
        // Throw an error if the text assertion fails
        throw new Error(`Failed to assert that element contains the expected text '${expectedText}': ${error.message}`);
    }
}

/**
 * Navigates to the specified URL.
 *
 * @param {Page} page - The Playwright Page object.
 * @param {string} url - The URL to navigate to.
 * @throws {Error} Throws an error if navigation fails.
 */
export async function navigateToUrl(page: Page, url: string): Promise<void> {
    try {
        // Navigate to the specified URL
        await page.goto(url);
    } catch (error) {
        // Throw an error if the navigation fails
        throw new Error(`Failed to navigate to '${url}': ${error.message}`);
    }
}

/**
 * Types a query into a specified input field by simulating sequential key presses with a delay.
 *
 * @param {Locator} input - The Playwright Locator object for the input field.
 * @param {string} query - The text to type into the input field.
 * @param {number} delay - The delay in milliseconds between each key press.
 * @throws {Error} Throws an error if typing into the input field fails.
 */
export async function typeInInputField(input: Locator, query: string, delay: number = 100): Promise<void> {
    try {
        // Type the query into the input field with a specified delay between each key press
        await input.pressSequentially(query, { delay });
    } catch (error) {
        // Throw an error if typing into the input field fails
        throw new Error(`Failed to type '${query}' into the input field with a delay of ${delay} ms: ${error.message}`);
    }
}

/**
 * Waits for the specified element to become visible.
 *
 * @param {Locator} element - The Playwright Locator object representing the element to wait for.
 * @param {number} timeout - The maximum time to wait for the element to become visible, in milliseconds. Default is 30000 ms.
 * @throws {Error} Throws an error if the element does not become visible within the specified timeout.
 */
export async function waitForElementToBeVisible(element: Locator, timeout: number = 30000): Promise<void> {
    try {
        // Wait for the element to be visible within the specified timeout
        await element.waitFor({ state: 'visible', timeout });
    } catch (error) {
        // Throw an error if the element does not become visible within the timeout
        throw new Error(`Failed to wait for the element to become visible within ${timeout} ms: ${error.message}`);
    }
}

/**
 * Waits for the page to reach the 'networkidle' state, indicating that there are no ongoing network requests.
 *
 * @param {Page} page - The Playwright Page object.
 * @throws {Error} Throws an error if waiting for the 'networkidle' state fails.
 */
export async function waitForNetworkIdle(page: Page): Promise<void> {
    try {
        // Wait for the page to reach the 'networkidle' state
        await page.waitForLoadState('networkidle');
    } catch (error) {
        // Throw an error if waiting for the 'networkidle' state fails
        throw new Error(`Failed to wait for the page to reach the 'networkidle' state: ${error.message}`);
    }
}

/**
 * Fills the specified input field with the provided username.
 *
 * @param {Locator} input - The Playwright Locator object representing the input field.
 * @param {string} username - The username to fill into the input field.
 * @throws {Error} Throws an error if filling the input field fails.
 */
export async function fillInputField(input: Locator, username: string): Promise<void> {
    try {
        // Fill the input field with the provided username
        await input.fill(username);
    } catch (error) {
        // Throw an error if filling the input field fails
        throw new Error(`Failed to fill the input field with username '${username}': ${error.message}`);
    }
}

/**
 * Asserts that a specified element is hidden within a given timeout.
 *
 * @param {Locator} element - The Playwright Locator object representing the element to check.
 * @param {number} timeout - The maximum time to wait for the element to be hidden, in milliseconds.
 * @throws {Error} Throws an error if the element is not hidden within the specified timeout.
 */
export async function assertElementIsHidden(element: Locator, timeout: number = 50000): Promise<void> {
    try {
        // Assert that the element is hidden within the specified timeout
        await expect(element).toBeHidden({ timeout });
    } catch (error) {
        // Throw an error if the assertion fails
        throw new Error(`Failed to assert that the element is hidden within ${timeout} ms: ${error.message}`);
    }
}

/**
 * Asserts that the specified element has exactly the given number of occurrences on the page.
 *
 * @param {Locator} element - The Playwright Locator object representing the element to check.
 * @param {number} count - The expected number of occurrences of the element.
 * @throws {Error} Throws an error if the number of occurrences does not match the expected count.
 */
export async function assertElementCount(element: Locator, count: number): Promise<void> {
    try {
        // Assert that the number of occurrences of the element matches the expected count
        await expect(element).toHaveCount(count);
    } catch (error) {
        // Throw an error if the assertion fails
        throw new Error(`Failed to assert that the element count is ${count}: ${error.message}`);
    }
}
