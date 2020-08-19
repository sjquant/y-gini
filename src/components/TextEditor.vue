<template>
  <section>
    <q-editor
      class="full-height"
      v-model="content"
      :definitions="{
        translate: {
          tip: 'Translate',
          icon: 'translate',
          label: 'translate',
          handler: translate,
        },
      }"
      :toolbar="[['translate']]"
    />
  </section>
</template>

<script>
import utils from "../utils.js";

export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    async translate() {
      const selection = window.getSelection().toString();
      const text = selection ? selection : this.content;
      this.$store.dispatch("TRANSLATE", utils.cleanText(text));
    },
  },
};
</script>
