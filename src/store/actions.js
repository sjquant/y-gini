import utils from "../utils.js";

export default {
  async TRANSLATE({ commit }, content) {
    commit("SET_LOADING", true);
    try {
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
      translation = utils.escapeHTML(translation).replace(/\n/g, "<br>");
      commit("APPEND_TRANSLATION", translation);
      await page.$eval("textarea", el => (el.value = ""));
      await page.keyboard.type(" ");
      await page.keyboard.press("Backspace");
    } finally {
      commit("SET_LOADING", false);
    }
  },
};
