<template>
  <div class="toolbar-container row no-wrap scroll-x">
    <slot />
  </div>
</template>
<style lang="scss">
.toolbar-container {
  height: 32px;
  padding: 0 4px;
  border-bottom: 1px solid $grey-4;
  /deep/ .q-btn {
    margin: 4px;
  }
}
</style>
