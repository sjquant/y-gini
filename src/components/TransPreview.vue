<template>
  <section>
    <div class="preview-container full-height">
      <div class="toolbar-container"></div>
      <div class="content" v-html="$store.state.translation"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.preview-container {
  border: 1px solid $grey-4;
  border-radius: 4px;

  > .toolbar-container {
    height: 32px;
    border-bottom: 1px solid $grey-4;
  }

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
