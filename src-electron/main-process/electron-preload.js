window.core = {};
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const getChromiumExecPath = () => {
  return puppeteer.executablePath().replace("app.asar", "app.asar.unpacked");
};

const initBrowser = async () => {
  let launchOptions = {
    headless: true,
    executablePath: getChromiumExecPath(),
  };
  const browser = await puppeteer.launch(launchOptions);
  return browser;
};

const initPage = async () => {
  if (!window.core.browser) {
    window.core.browser = await initBrowser();
    window.core.browser.on("disconnected", () => {
      window.core.browser = null;
    });
  }
  const page = await window.core.browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );

  // define source and target language code
  const sourceLang = "en",
    targetLang = "ko";

  await page.goto(
    `https://translate.google.com/?hl=${sourceLang}&sl=${sourceLang}&tl=${targetLang}&op=translation`
  );

  // detect the source textarea for input data (source string)
  await page.waitForSelector("textarea");
  await page.waitFor(1000);
  return page;
};

getPage = async () => {
  if (!window.core.page || window.core.page.isClosed()) {
    window.core.page = await initPage();
  }
  return window.core.page;
};

window.core.getPage = getPage;
getPage();
