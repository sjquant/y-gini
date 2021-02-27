export default {
  copyText(text) {
    const el = document.createElement("div");
    el.innerHTML = text;
    document.body.appendChild(el);
    window.getSelection().removeAllRanges();
    let range = document.createRange();
    range.selectNode(el);
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    document.body.removeChild(el);
  },
};
