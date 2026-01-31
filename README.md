To help you set up and run your project professionally, I've created a comprehensive `README.md` file. This includes the installation steps, execution commands, and how to view the Playwright HTML report.

---

## 📄 README.md

# IT3040 Assignment 1 - Transliteration Testing

This project uses **Playwright** to perform automated functional and UI testing for the Swift Translator web application. It validates the accuracy of Sinhala transliteration across 35 different test cases.

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your system (LTS version recommended).

### 2. Installation

Clone your repository or navigate to the project folder, then run:

```bash
# Install project dependencies
npm install

# Install Playwright browsers (Chromium, Firefox, WebKit)
npx playwright install

```

---

## 🛠️ Running the Tests

You can run your tests in different modes depending on your needs:

### Run all tests (Headed)

To see the browser while tests are running:

```bash
npx playwright test --headed

```

### Run all tests (Headless)

Recommended for faster execution or CI/CD:

```bash
npx playwright test

```

### Run a specific test file

```bash
npx playwright test tests/transliteration.spec.js

```

---

## 📊 Viewing the Report

After the tests complete, Playwright automatically generates a detailed HTML report.

### To open the report:

```bash
npx playwright show-report

```

### What's in the report?

* **Pass/Fail Status:** A summary of all 35 cases.
* **Flakiness Analysis:** Identification of unstable tests.
* **Error Logs:** Detailed logs and snippets of where a test failed.
* **Video/Screenshots:** (If enabled in `playwright.config.js`) Visual proof of the failure.

---

## 📁 Project Structure

* `tests/` - Contains the Playwright test scripts.
* `playwright.config.js` - Configuration for timeouts, browsers, and reporting.
* `package.json` - Node.js dependencies and scripts.

---

## 💡 Pro-Tip: Visual Debugging

If you want to debug why a specific case is failing, use the **Playwright Inspector**:

```bash
npx playwright test --debug

```

Would you like me to also provide a **`playwright.config.js`** file to ensure your reports are automatically saved as PDFs or shared as a single folder?