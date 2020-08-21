export default {
  async TRANSLATE({ commit }, content) {
    try {
      commit("SET_LOADING", true);
      const page = await window.getPage();
      await page.$eval("#source", (el, value) => (el.value = value), content);
      await page.waitForSelector(".result-shield-container");
      const translation = await page.evaluate(() => {
        return document.querySelectorAll(
          ".result-shield-container .translation"
        )[0].innerHTML;
      });
      commit("APPEND_TRANSLATION", translation);
      await page.$eval("#source", el => (el.value = ""));
    } finally {
      commit("SET_LOADING", false);
    }
  },
};
