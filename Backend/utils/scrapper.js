const puppeteer = require("puppeteer-core");

const scrapeJobDetails = async (url, selectors) => {
  // Use safer options for Puppeteer in production
  const browser = await puppeteer.launch({
    headless: "new", // Use the latest headless mode
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--window-size=1920,1080",
    ],
  });

  const page = await browser.newPage();

  try {
    // Set a user agent for production to avoid detection
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    // Set additional headers to mimic real browser behavior
    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    // Navigate to the URL with better error handling
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    // Add a delay to let content load (adjust based on site behavior)
    await page.waitForTimeout(2000);

    // Perform the scraping operation
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
          document.querySelectorAll(selectors.otherDetails) || []
        ).map((details) => details.innerText.trim()),
        aboutCompany: getText(selectors.aboutCompany),
      };
    }, selectors);

    // Return the scraped data
    return jobDetails;
  } catch (error) {
    console.error("Error scraping the page:", error.message);

    // Capture a screenshot for debugging in production
    await page.screenshot({ path: "error_screenshot.png" });

    throw error; // Rethrow the error to handle it upstream
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeJobDetails };
