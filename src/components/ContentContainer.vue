<template>
  <section>
    <div class="content-container full-height">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.content-container {
  border: 1px solid $grey-4;
  border-radius: 4px;
}
</style>
