export default {
  /**
   * Clean text for translation
   * @param {String} content
   */
  cleanText(content) {
    return content
      .replace(/<(\/p|\/div|br)>/gi, "\n")
      .replace(/<[^>]*>?/gm, "")
      .replace(/&nbsp;/gi, " ");
  },
};
