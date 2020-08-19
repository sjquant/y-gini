<template>
  <section>
    <div class="preview-container full-height">
      <PreviewToolbar />
      <div class="content" v-html="$store.state.translation"></div>
    </div>
  </section>
</template>

<script>
import PreviewToolbar from "./TransPreviewToolbar.vue"

export default {
  components: {
    PreviewToolbar
  }
}
</script>

<style lang="scss" scoped>
.preview-container {
  border: 1px solid $grey-4;
  border-radius: 4px;

  > .content {
    padding: 10px;
    line-height: 1.5;
  }
}
</style>

<style lang="scss">
.preview-container .content {
  br {
    content: "";
    display: block;
    margin: 16px;
  }
}
</style>
