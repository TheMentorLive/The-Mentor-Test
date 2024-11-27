const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium'); // Or chrome-aws-lambda for AWS Lambda

const scrapeJobDetails = async (url, selectors) => {
  let browser = null;
  try {
    // Launch Chromium using executablePath from @sparticuz/chromium
    browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(), // Ensure this is the correct path for your environment
      headless: chromium.headless, // Should be headless in cloud environments
      args: chromium.args, // Pass the correct arguments for cloud environments
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

    // Your scraping code remains the same

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
