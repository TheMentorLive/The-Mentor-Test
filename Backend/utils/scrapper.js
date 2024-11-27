const puppeteer = require("puppeteer-extra");
const chromium = require("@sparticuz/chromium");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const scrapeJobDetails = async (url, selectors) => {
  let browser = null;

  try {
    console.log("Launching browser...");
    browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      args: chromium.args.concat([
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ]),
    });

    const page = await browser.newPage();

    // Set user agent, viewport, and headers
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
    );
    await page.setViewport({ width: 1280, height: 800 });
    await page.setExtraHTTPHeaders({ "accept-language": "en-US,en;q=0.9" });

    console.log(`Navigating to URL: ${url}`);
    const response = await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
    if (!response || !response.ok()) {
      throw new Error(
        `Failed to load page: ${url}, status: ${response ? response.status() : "Unknown"}`
      );
    }

    console.log("Page loaded successfully. Starting scraping process...");

    // Wait for a short delay to simulate human interaction
    await page.waitForTimeout(2000);

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
    throw error; // Re-throw the error after logging
  } finally {
    if (browser) {
      console.log("Closing browser...");
      await browser.close();
    }
  }
};

module.exports = { scrapeJobDetails };
