const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium"); // Use chromium for cloud environments

const scrapeJobDetails = async (url, selectors) => {
  let browser = null;

  try {
    console.log("Launching browser...");

    // Launch Chromium using executablePath from @sparticuz/chromium
    browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(),
      headless: chromium.headless, // Should be headless in cloud environments
      args: chromium.args.concat([
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ]),
    });

    const page = await browser.newPage();
    console.log(`Navigating to URL: ${url}`);

    // Verify page loading status
    const response = await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
    if (!response || !response.ok()) {
      throw new Error(
        `Failed to load page: ${url}, status: ${response ? response.status() : "Unknown"}`
      );
    }

    console.log("Page loaded successfully. Starting scraping process...");

    // Debugging: Log page content (for deployment debugging only)
    const pageContent = await page.content();
    console.log("Page HTML loaded. Length:", pageContent.length);

    // Ensure all required elements are loaded
    for (const key in selectors) {
      try {
        await page.waitForSelector(selectors[key], { timeout: 10000 });
        console.log(`Selector "${key}" is present on the page.`);
      } catch (error) {
        console.warn(`Selector "${key}" not found on the page.`);
      }
    }

    // Scrape job details
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

    // Log detailed error messages
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

    throw error; // Re-throw the error after logging
  } finally {
    if (browser) {
      console.log("Closing browser...");
      await browser.close();
    }
  }
};

module.exports = { scrapeJobDetails };
