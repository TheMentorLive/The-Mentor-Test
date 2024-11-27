const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium'); // Or chrome-aws-lambda for AWS Lambda

const scrapeJobDetails = async (url, selectors) => {
  let browser = null;

  try {
    console.log("Launching browser...");
    // Launch Chromium using executablePath from @sparticuz/chromium
    browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(), // Ensure this is the correct path for your environment
      headless: chromium.headless, // Should be headless in cloud environments
      args: chromium.args, // Pass the correct arguments for cloud environments
    });

    const page = await browser.newPage();
    console.log(`Navigating to URL: ${url}`);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

    console.log("Page loaded successfully. Starting scraping process...");

    const jobDetails = await page.evaluate((selectors) => {
      const getText = (selector) =>
        document.querySelector(selector)?.innerText.trim() || "Not Available";

      const getAttribute = (selector, attribute) =>
        document.querySelector(selector)?.getAttribute(attribute) || "Not Available";

      return {
        title: getText(selectors.title),
        company: getText(selectors.company),
        companyImage: getAttribute(selectors.companyImage, "src"),
        location: getText(selectors.location),
        salary: getText(selectors.salary),
        experience: getText(selectors.experience),
        postDetails: getText(selectors.postDetails),
        description: getText(selectors.description),
        role: getText(selectors.role),
        otherDetails: Array.from(
          document.querySelectorAll(selectors.otherDetails)
        ).map((details) => details.innerText.trim()),
        aboutCompany: getText(selectors.aboutCompany),
      };
    }, selectors);

    console.log("Scraping completed successfully:", jobDetails);
    return jobDetails;

  } catch (error) {
    console.error("Error during scraping:", error.message);

    // Log additional details for debugging
    if (error.message.includes("ERR_INVALID_URL")) {
      console.error(
        `Invalid URL: The provided URL "${url}" is not properly formatted. Please check the URL.`
      );
    } else if (error.message.includes("timeout")) {
      console.error(
        `Timeout Error: The page at "${url}" took too long to load. Consider increasing the timeout or checking network issues.`
      );
    } else if (error.message.includes("Cannot read properties of undefined")) {
      console.error(
        "Selector Error: One or more of the selectors are invalid or the element does not exist on the page."
      );
    } else {
      console.error("Unexpected Error:", error.stack);
    }

    throw error; // Re-throw the error after logging for further handling
  } finally {
    if (browser) {
      console.log("Closing browser...");
      await browser.close();
    }
  }
};

module.exports = { scrapeJobDetails };
