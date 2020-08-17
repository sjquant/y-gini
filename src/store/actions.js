export default {
  async TRANSLATE({ commit }, content) {
    const page = window.page;
    await page.$eval("#source", (el, value) => (el.value = value), content);
    await page.waitForSelector(".result-shield-container");
    const translation = await page.evaluate(() => {
      return document.querySelectorAll(
        ".result-shield-container .translation"
      )[0].innerHTML;
    });
    commit("SET_TRANSLATION", translation);
    await page.$eval("#source", el => (el.value = ""));
  },
};
