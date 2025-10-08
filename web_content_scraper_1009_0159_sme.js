// 代码生成时间: 2025-10-09 01:59:17
const puppeteer = require('puppeteer');
const fs = require('fs/promises');

/**
 * Scrape content from a webpage
 * @param {string} url - The URL of the webpage to scrape
 * @param {string} outputPath - The file path to save the scraped content
 */
async function scrapeWebContent(url, outputPath) {
  try {
    // Launch a new browser instance
    const browser = await puppeteer.launch();
    // Create a new page
    const page = await browser.newPage();
    // Navigate to the specified URL
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Get the content of the webpage
    const content = await page.content();

    // Close the browser
    await browser.close();

    // Save the content to a file
    await fs.writeFile(outputPath, content);

    console.log(`Content scraped and saved to ${outputPath}`);
  } catch (error) {
    console.error('An error occurred while scraping:', error);
  }
}

// Example usage:
// scrapeWebContent('https://example.com', './scraped_content.html')

module.exports = { scrapeWebContent };