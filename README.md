# Gamdom E2E Testing Project (Playwright + TypeScript)
![playwright](https://github.com/user-attachments/assets/2a997963-15c1-487c-a4d7-ed79925a6195)

## Overview

This repository contains end-to-end (E2E) tests for the Gamdom platform using Playwright and TypeScript. The tests aim to validate critical functionalities of the web application, ensuring stability and performance. 

## Project Structure
- **`.github`**: Contains GitHub-specific metadata, such as GitHub Actions workflows.
- **`node_modules`**: Contains the project dependencies.
- **`tests/`**: Contains test files that cover various functionalities of the Gamdom platform.
- **`pages/`**: Contains page object models representing different pages of the application.
- **`utils/`**: Includes utility functions and helpers used across the test suite.
- **`playwright.config.ts`**: Configuration file for Playwright.
- **`tsconfig.json`**: TypeScript configuration file.
- **`package.json`**: Contains project dependencies and scripts.


## Prerequisites

Ensure that the following software is installed:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://classic.yarnpkg.com/en/docs/install)

## Project Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/JayalakshmiShetty/gamdom.git
2. **Navigate to the project directory**: `cd gamdom`
3. **Install the dependencies**: `npm install`


## Running the Tests

- To run all API tests: `npm run api_tests`
- To run all UI tests on Chrome Browser in headless mode: `npm run ui_tests`
- To run all tests: `npm run all_tests`

 There are various test execution options in the package.json file. Here are some examples:
   * Run UI tests with a user interface: `npm run all_tests_ui`
   * Run UI tests using Chrome: `npm run ui_tests`
   * Run UI tests using Firefox: `npm run ui_firefox`
   * Run UI tests using Firefox in headed mode: `npm run ui_headed_firefox`
   * Run UI tests using Firefox: `npm run ui_chromium`
   * Run UI tests using Firefox in headed mode: `npm run ui_headed_chromium`
   * Run UI tests in debug mode: `npm run test:ui:debug`
   * Generate a test results report: `npm run test:ui:generate-report`

## Reporters
In `playwright.config.ts`, you can specify the type of reporter you want to use for your Playwright tests. You can choose from a variety of built-in reporters or even use a custom reporter. 

## GitHub Actions
This project leverages GitHub Actions for continuous integration. The workflow definitions for both API and UI tests are located in the .github/workflows directory, with specific files for each type:
  
   **API tests**: `api-tests.yml`
   
   **UI tests**: `playwright-tests.yml`

Please note that UI tests may currently fail on GitHub Actions due to server location issues affecting website accessibility. Please find the screenshot below.
   ![image](https://github.com/user-attachments/assets/2c39107a-7cbb-4650-9c86-ee86ab2b1058)

These workflows automate test execution on every push to the repository, providing immediate feedback on test results. This process is crucial for maintaining code quality and identifying issues early.

You can review the outcomes of these workflows in the "Actions" tab of the GitHub repository.


## Successful Tests Screenshot 

Please find successful test videos and AllRuns Screenshot under following directory.
1. **Successful Execution Report** 
![SUCCESS](./successful-test-results/AllRuns.png)`
2. **UI Failure Report**
![UI Failure](https://github.com/user-attachments/assets/f740b4bf-5128-4917-a2fa-937f411e8be2)
3. **API Failure Report**
![API Failure](https://github.com/user-attachments/assets/284bf354-926b-4cc9-9cea-068ad5014054)

## Successful Test Videos  

   **TestCase1: Should match the visual snapshot of the casino-page**
![Should-match-the-visual-snapshot-of-the-casino-page (1)](https://github.com/user-attachments/assets/ab8f55d5-5578-4067-a2cb-827c70531b00)
 
  **TestCase2:Should prevent bet placement while logged-out**
![Should-prevent-bet-placement-while-logged-out](https://github.com/user-attachments/assets/f00771e2-b30b-4912-8008-52d638edee98)

  **TestCase3:Verify CAPTCHA is present but hidden on SignIn**
![Verify-CAPTCHA-is-present-but-hidden-on-SignIn](https://github.com/user-attachments/assets/b6fa7e28-a832-4642-be6a-76bc0630c5bf)

  **TestCase4:Verify Game Search functionality works**
![Verify-Game-Search-functionality-works](https://github.com/user-attachments/assets/cae2e89c-ecd7-4278-9a52-503dc64ca5fd)


## Exploratory testing Key Areas
1. **Bet Placement and Wagering Functionality**
Ensure users can place bets on both sports and casino games without issues.

      * Sports Page:
  
         - Place a bet on various sports events.
  
         - Verify the odds are correctly updated and reflect the user's selection.
  
         - Check the bet slip functionality to ensure users can view, modify, and confirm their bets.
  
      * Casino Page:
        
         - Place wagers on different casino games (e.g., slots, table games).
        
         - Verify that game results and payouts are calculated correctly.
        
         - Ensure users can see their bet history and transaction records.

3. **User Account and Authentication**
Validate that users can securely log in, register, and manage their accounts.
      
      * Login and Registration:

          - Test login with valid and invalid credentials.
   
          - Check the registration process for new users, including email verification and password strength requirements.
   
      * Account Management:
   
          - Verify users can update their profile information, such as email and password.
   
          - Test account recovery options (e.g., password reset).

4. **Payment and Withdrawal Processing**
Ensure users can deposit funds, withdraw money, and view transaction history.
      
      * Deposits:
   
          - Test various payment methods (credit/debit cards, e-wallets, etc.) to ensure deposits are processed correctly.
      
      * Withdrawals:
         
          - Verify that withdrawal requests are handled promptly and accurately.
          
          - Check that withdrawal methods are functioning and that users receive their funds within the promised timeframe.

5. **Game Functionality and User Experience**
Verify that all casino games and sports betting features are functioning correctly and provide a good user experience.

      * Casino Games:
   
          - Test various games for functionality, including slots, table games, and live dealer options.
   
          - Ensure that games load correctly, respond to user inputs, and provide accurate results.
   
      * Sports Betting:
   
          - Check the display and updating of sports events, odds, and betting options.
   
          - Verify that bet placements and odds calculations are accurate.

6. **Customer Support Integration**
Ensure that customer support is accessible and functional.

      * Live Chat:
   
          - Test the live chat feature for responsiveness and effectiveness in resolving user queries.
   
      * Contact Forms:
   
          - Verify that contact forms are working and submissions are received by the support team.
   
      * Help Resources:
   
          - Check the availability and accuracy of help resources, such as FAQs and user guides.
