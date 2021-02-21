<template>
  <q-btn
    flat
    :size="size"
    :label="label"
    :icon="icon"
    dense
    @click.prevent="onClick"
    @mousedown.prevent
  />
</template>

<script>
export default {
  props: {
    icon: String,
    label: { type: String, default: "" },
    size: {
      type: String,
      default: "sm",
    },
  },
  methods: {
    onClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>
