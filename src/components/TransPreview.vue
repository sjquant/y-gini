<template>
  <ContentContainer>
    <Toolbar>
      <ToolbarItem icon="chat" label="원문보기" @click="openOriginalAll" />
      <ToolbarItem icon="view_headline" label="문장분할" @click="splitAll" />
      <ToolbarItem icon="content_copy" label="전체복사" @click="copyAll" />
      <ToolbarItem icon="clear" label="전체삭제" @click="clearAll" />
    </Toolbar>
    <div class="trans-preview-container">
      <TransPreviewBlock
        v-for="(item, i) in $store.state.translations"
        :key="i"
        :item="item"
        :index="i"
        ref="transPreviewBlock"
      />
    </div>
  </ContentContainer>
</template>

<script>
import utils from "../utils.js";
import ContentContainer from "./ContentContainer.vue";
import Toolbar from "./Toolbar.vue";
import ToolbarItem from "./ToolbarItem.vue";
import TransPreviewBlock from "./TransPreviewBlock.vue";

export default {
  components: {
    ContentContainer,
    Toolbar,
    ToolbarItem,
    TransPreviewBlock,
  },
  methods: {
    openOriginalAll() {
      const blocks = this.$refs.transPreviewBlock;
      for (let block of blocks) {
        block.openOriginal();
      }
    },
    splitAll() {
      const blocks = this.$refs.transPreviewBlock;
      for (let block of blocks) {
        block.splitSentences();
      }
    },
    copyAll() {
      const blocks = this.$refs.transPreviewBlock;
      const text = blocks.map(block => block.getContent()).join("<br><br>");
      utils.copyText(text);
    },
    clearAll() {
      this.$store.commit("CLEAR_TRANSLATION");
    },
  },
};
</script>
<style lang="scss" scoped>
.trans-preview-container {
  max-height: calc(100% - 32px);
  overflow-y: auto;
}
</style>
