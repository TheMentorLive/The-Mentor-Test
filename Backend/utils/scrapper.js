const chromium = require('@sparticuz/chromium');

const scrapeJobDetails = async (url, selectors) => {
  let browser = null;
  try {
    // Use pre-configured browser environment provided by the platform
    browser = await chromium.puppeteer.connect({
      browserWSEndpoint: await chromium.executablePath,  // Connect to existing WebSocket browser endpoint
      headless: chromium.headless,
    });

    const page = await browser.newPage();  // Open a new page instance

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });  // Wait for the page to load

    // Scrape job details based on provided selectors
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

    return jobDetails;  // Return the scraped details
  } catch (error) {
    console.error("Error scraping the page:", error);  // Log any errors
    throw error;  // Rethrow the error for higher-level handling
  } finally {
    if (browser) {
      await browser.close();  // Ensure that the browser is closed after use
    }
  }
};

module.exports = { scrapeJobDetails };
