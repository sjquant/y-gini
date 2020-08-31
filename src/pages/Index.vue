<template>
  <q-page class="q-pa-sm flex flex-center">
    <q-page-sticky position="top-right" :offset="[16, 16]">
      <q-btn flat size="sm" icon="settings" dense color="grey-8"></q-btn>
    </q-page-sticky>
    <div class="full-width row items-center justify-center">
      <TextEditor class="col-6 content-section q-pr-sm" />
      <TransPreview class="col-6 content-section q-pl-sm" />
      <q-circular-progress
        v-show="$store.state.isLoading"
        indeterminate
        size="60px"
        :thickness="0.15"
        color="primary"
        class="fixed"
      />
    </div>
  </q-page>
</template>

<script>
import TextEditor from "../components/TextEditor.vue";
import TransPreview from "../components/TransPreview.vue";

export default {
  name: "PageIndex",
  components: {
    TextEditor,
    TransPreview,
  },
};
</script>

<style scoped lang="scss">
.content-section {
  max-width: 600px;
  height: 80vh;

  /deep/ .q-editor__content {
    height: calc(80vh - 40px) !important;
    max-height: calc(80vh - 40px) !important;
  }
}
</style>
