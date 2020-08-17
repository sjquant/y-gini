const puppeteer = require("puppeteer");

(async () => {
  let launchOptions = { headless: true };

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );

  // define source and target language code
  let sourceLang = "en",
    targetLang = "ko";

  await page.goto(
    `https://translate.google.com/#view=home&op=translate&sl=${sourceLang}&tl=${targetLang}`
  );

  // detect the source textarea for input data (source string)
  await page.waitForSelector("#source");
  await page.waitFor(1000);
  window.browser = browser;
  window.page = page;
})();
