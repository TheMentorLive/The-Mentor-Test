const { join } = require("path");

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  cacheDirectory: join(__dirname, ".cache", "puppeteer"),
  headless: true,
  defaultViewport: {
    width: 1280,
    height: 720,
  },
};
