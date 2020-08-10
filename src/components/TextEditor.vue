<template>
  <section>
    <q-editor
      class="full-height"
      v-model="content"
      :toolbar="[['bold', 'italic', 'strike', 'underline']]"
    />
  </section>
</template>

<script>
export default {
  data() {
    return {
      content: "",
    };
  },
};
</script>
