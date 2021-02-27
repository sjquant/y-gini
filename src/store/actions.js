import utils from "../utils.js";

const googleTranslate = async content => {
  const page = await window.core.getPage();
  await page.focus("textarea");
  await page.$eval("textarea", (el, value) => (el.value = value), content);
  await page.keyboard.type(" ");
  await page.waitForSelector("span[lang='ko'] > span");
  let translation = await page.evaluate(() => {
    const spans = document.querySelectorAll("span[lang='ko']");
    const text = spans[0].innerText;
    return text;
  });
  translation = utils.escapeHTML(translation);
  // Remove textarea
  await page.$eval("textarea", el => (el.value = ""));
  await page.keyboard.type(" ");
  await page.keyboard.press("Backspace");
  return translation;
};

const splitContents = content => {
  return content.split(/(\r?\n){2,}/g).filter(x => x.trim());
};

const splitTranslations = translation => {
  return translation.split(/(\r?\n){2,}/g).filter(x => x.trim());
};

export default {
  async TRANSLATE({ commit }, content) {
    let data;

    commit("SET_LOADING", true);

    try {
      data = await googleTranslate(content);
    } finally {
      commit("SET_LOADING", false);
    }

    const originals = splitContents(content);
    const translations = splitTranslations(data);
    for (let i = 0; i < translations.length; i++) {
      const translation = {
        original: originals[i],
        translation: translations[i],
      };
      commit("APPEND_TRANSLATION", translation);
    }
  },
};
