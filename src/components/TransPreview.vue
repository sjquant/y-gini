<template>
  <ContentContainer>
    <Toolbar>
      <ToolbarItem icon="view_headline" label="SPLIT-ALL" @click="splitAll" />
      <ToolbarItem icon="clear" label="CLEAR" @click="clearAll" />
    </Toolbar>
    <div class="content" v-html="$store.state.translation" :style="style"></div>
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
      const translation = this.$store.state.translation
        .replace(/(<([^(br)^>]+)>)/gi, "")
        .replace(/\r/gm, "")
        .replace(/\n/gm, "<br>")
        .replace(/([\.]+) /gm, "$1<br><br>")
        .replace(/<br><br>+/gi, "<br><br>");
      this.$store.commit("SET_TRANSLATION", translation);
    },
    clearAll() {
      this.$store.commit("CLEAR_TRANSLATION");
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 10px;
  line-height: 1.5;
  max-height: calc(100% - 32px);
  overflow-y: auto;
  br {
    content: "";
    display: block;
    margin: 16px;
  }
}
</style>
