<template>
  <q-page class="q-pa-sm flex flex-center">
    <div class="full-width row items-center justify-center">
      <TextEditor class="col-6 content-section" />
      <TransPreview class="col-6 content-section q-pl-lg" />
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
