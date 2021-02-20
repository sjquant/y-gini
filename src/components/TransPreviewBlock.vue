<template>
  <div
    class="trans-preview-container__block"
    v-html="translation"
    tabindex="0"
    :style="style"
    @keyup.delete="deleteBlock"
  ></div>
</template>
<script>
export default {
  props: {
    translation: String,
    index: Number,
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
    splitAll() {
      const index = this.index;
      const translation = this.translation
        .replace(/(<([^(br)^>]+)>)/gi, "")
        .replace(/\r/gm, "")
        .replace(/\n/gm, "<br>")
        .replace(/([\.]+) /gm, "$1<br><br>")
        .replace(/<br><br>+/gi, "<br><br>");
      this.$store.commit("UPDATE_TRANSLATION", { index, translation });
    },
    deleteBlock() {
      this.$store.commit("DELETE_TRANSLATION", this.index);
    },
  },
};
</script>

<style lang="scss" scoped>
.trans-preview-container__block {
  padding: 10px;
  line-height: 1.5;
  max-height: calc(100% - 32px);
  overflow-y: auto;

  &:focus {
    outline: 2px dashed $primary-light;
  }

  br {
    content: "";
    display: block;
    margin: 16px;
  }
}
</style>
