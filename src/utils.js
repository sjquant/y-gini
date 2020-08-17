export default {
  /**
   * Clean text for translation
   * @param {String} text
   */
  cleanText(text) {
    return text
      .replace(/<(\/p|\/div|br)>/gi, "\n")
      .replace(/<[^>]*>?/gi, "")
      .replace(/&nbsp;/gi, " ");
  },

  createParagraph(text) {
    console.log(text);
    return text
      .replace(/\.(\s)?(\r)*\n/gi, ".<br><br>")
      .replace(/(\r)*\n/gi, " ");
  },
};
