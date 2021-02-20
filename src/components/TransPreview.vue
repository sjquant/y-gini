<template>
  <ContentContainer>
    <Toolbar>
      <ToolbarItem icon="view_headline" label="SPLIT-ALL" @click="splitAll" />
      <ToolbarItem icon="clear" label="CLEAR" @click="clearAll" />
    </Toolbar>
    <TransPreviewBlock
      class="trans-preview-container"
      v-for="(translation, i) in $store.state.translations"
      :key="i"
      :translation="translation"
      :index="i"
      ref="transPreviewBlock"
    />
  </ContentContainer>
</template>

<script>
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
    splitAll() {
      const blocks = this.$refs.transPreviewBlock;
      for (let block of blocks) {
        block.splitAll();
      }
    },
    clearAll() {
      this.$store.commit("CLEAR_TRANSLATION");
    },
  },
};
</script>
