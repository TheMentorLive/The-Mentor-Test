const chromium = require('@sparticuz/chromium'); // Import the chromium package

const scrapeJobDetails = async (url, selectors) => {
  let browser = null;
  try {
    // Launch the browser using the direct chromium instance
    browser = await chromium.puppeteer.launch({
      executablePath: await chromium.executablePath,
      args: chromium.args,
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Set the user agent to mimic a browser request
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    // Navigate to the URL
    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

    // Scrape the job details
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

    return jobDetails;
  } catch (error) {
    console.error("Error scraping the page:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = { scrapeJobDetails };
