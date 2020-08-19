<template>
    <div class="toolbar-container">
      <q-btn flat label="CLEAR" dense icon="clear" size="sm" @click="clearAll"/>
    </div>
</template>

<script>
export default {
  methods: {
    clearAll() {
      this.$store.commit("CLEAR_TRANSLATION")
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar-container {
    height: 32px;
    padding: 0 4px;
    border-bottom: 1px solid $grey-4;
  
  /deep/ .q-btn {
    margin: 4px;
  }
  }
</style>