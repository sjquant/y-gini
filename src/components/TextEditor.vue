<template>
  <ContentContainer>
    <Toolbar>
      <ToolbarItem icon="translate" label="번역" @click="translate" />
      <ToolbarItem icon="view_headline" label="문장분할" @click="splitAll" />
      <ToolbarItem icon="clear" label="전체삭제" @click="clearAll" />
    </Toolbar>
    <textarea
      ref="editor"
      class="editor"
      :style="style"
      v-model="content"
    ></textarea>
  </ContentContainer>
</template>

<script>
import ContentContainer from "./ContentContainer.vue";
import Toolbar from "./Toolbar.vue";
import ToolbarItem from "./ToolbarItem.vue";

export default {
  components: {
    ContentContainer,
    Toolbar,
    ToolbarItem,
  },
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    this.$refs.editor.addEventListener("paste", e => {
      // Change paste behavior
      e.preventDefault();
      const clipboardData = e.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData("Text");
      document.execCommand("insertText", false, this.trimSentence(pastedData));
      this.$refs.editor.focus();
    });
  },
  computed: {
    style() {
      const fontSize = this.$store.state.setting.fontSize;
      return {
        "font-size": `${fontSize}px`,
      };
    },
  },
  methods: {
    trimSentence(text) {
      return text
        .replace(/([\w,=\(\)]|e\.g\.|et al\.|i\.e\.)(\r?\n)+/gm, "$1 ") // fix incomplete sentence
        .replace(/([^\d]+\.)(\d+(\-|−|–)\d+|(\d+,?)+)/gm, "$1") // Remove footnote
        .replace(/([^\d]+\.)\d+( ?[A-Z]+)/gm, "$1$2") // Remove footnote
        .replace(/ ?\[(\d+(\-|−|–|,)\d+|\d+)\]/gm, "") // Remove footnote
        .replace(/,(\d+)/gm, "") // Remove footnote
        .replace(/[\.]\n/gm, ".\n");
    },
    async translate() {
      const selection = window.getSelection().toString();
      const text = selection ? selection : this.content;
      this.$store.dispatch("TRANSLATE", text);
    },
    clearAll() {
      this.content = "";
    },
    splitAll() {
      this.content = this.content
        .replace(/\r/gm, "")
        .replace(/\n/gm, "\n\n")
        .replace(/([^(e\.g|et al)][\.]+) /gm, "$1\n\n")
        .replace(/\n\n+/gi, "\n\n");
    },
  },
};
</script>

<style lang="scss" scoped>
.editor {
  resize: none;
  width: 100%;
  height: calc(100% - 32px);
  border: none;
  outline: none;
  padding: 10px;
  line-height: 1.5;
}
</style>
