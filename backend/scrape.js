const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to the URL
  await page.goto('https://www.placementpreparation.io/mcq/python/'); // Replace with your URL

  try {
    // Wait for the selector to appear on the page
    await page.waitForSelector('.questionContent', { timeout: 30000 });

    // Extract questions and options
    const questions = await page.evaluate(() => {
      const questions = [];
      document.querySelectorAll('.questionContent').forEach(question => {
        const questionText = question.querySelector('.questionContentText p').innerText.trim();
        const options = [];
        question.querySelectorAll('.optionItem').forEach(option => {
          const optionText = option.querySelector('.optionContent').innerText.trim();
          const isCorrect = option.classList.contains('correct'); // Example condition
          options.push({ text: optionText, isCorrect });
        });
        questions.push({ question: questionText, options });
      });
      return questions;
    });

    console.log('Questions and options:', questions);

    // Save the questions and options to a JSON file
    fs.writeFileSync('questions.json', JSON.stringify(questions, null, 2));
    console.log('Questions and options saved to questions.json');

  } catch (error) {
    console.error('Element not found or other error:', error);

    // Capture a screenshot for debugging
    await page.screenshot({ path: 'screenshot.png' });
    console.log('Screenshot saved to screenshot.png');

    // Print the page content for debugging
    const content = await page.content();
    console.log('Page content:', content);
  }

  // Close the browser
  await browser.close();
})();