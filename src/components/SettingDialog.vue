<template>
  <q-dialog
    :value="on"
    @input="$emit('update:on', !on)"
    @before-hide="initialize"
  >
    <q-card class="dialog-card">
      <q-card-section class="q-pb-xs">
        <span class="text-subtitle">Settings</span>
      </q-card-section>
      <q-card-section class="q-pb-xs">
        <q-input
          v-model="setting.fontSize"
          label="Font Size"
          dense
          lazy-rules
          :rules="[val => !isNaN(Number(val)) || 'Please type number!']"
        />
      </q-card-section>
      <q-card-section class="q-pt-xs">
        <div class="row justify-end q-gutter-sm">
          <q-btn flat color="grey-6" @click="cancel">취소</q-btn>
          <q-btn flat color="primary" @click="save">적용</q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    on: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      setting: {},
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.setting = { ...this.$store.state.setting };
    },
    cancel() {
      this.initialize();
      this.$emit("update:on", false);
    },
    save() {
      this.$store.commit("UPDATE_SETTING", this.setting);
      this.$emit("update:on", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-card {
  width: 400px;
}
</style>
