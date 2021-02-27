<template>
  <div
    tabindex="0"
    class="trans-preview-container__block"
    @keyup.delete="deleteBlock"
    @keyup.ctrl.67="copyBlock"
    @mouseenter="mouseenter"
    @mouseleave="hover = false"
    @focus="focus = true"
    @blur="focus = false"
  >
    <Toolbar v-show="showToolbar" :style="toolbarStyle">
      <ToolbarItem icon="chat" @click="openOriginal" />
      <ToolbarItem icon="view_headline" @click="splitSentences" />
      <ToolbarItem icon="content_copy" @click="copyBlock" />
      <ToolbarItem icon="delete" size="xs" @click="deleteBlock" />
    </Toolbar>
    <div class="block__content" ref="blockContent">
      <div class="block__original" :style="contentStyle" v-if="showOriginal">
        <q-icon name="keyboard_arrow_right" />
        {{ original }}
      </div>
      <div :style="contentStyle" class="block__translation">
        {{ translation }}
      </div>
    </div>
  </div>
</template>
<script>
import utils from "../utils.js";
import Toolbar from "./Toolbar.vue";
import ToolbarItem from "./ToolbarItem.vue";

export default {
  components: {
    Toolbar,
    ToolbarItem,
  },
  data() {
    return {
      toolbarWidth: 0,
      rect: {},
      focus: false,
      hover: false,
      showOriginal: false,
    };
  },
  props: {
    item: Object,
    index: Number,
  },
  computed: {
    translation() {
      return this.item.translation;
    },
    original() {
      return this.item.original;
    },
    contentStyle() {
      const fontSize = this.$store.state.setting.fontSize;
      return {
        "font-size": `${fontSize}px`,
      };
    },
    toolbarStyle() {
      const { top, right } = this.rect;
      return {
        position: "fixed",
        left: `${right - 64}px`,
        top: `${top - 16}px`,
      };
    },
    showToolbar() {
      return this.focus || this.hover;
    },
  },
  methods: {
    openOriginal() {
      this.showOriginal = !this.showOriginal;
    },
    splitSentences() {
      const index = this.index;
      const translation = this.translation
        .replace(/(<([^(br)^>]+)>)/gi, "")
        .replace(/\r/gm, "")
        .replace(/\n/gm, "<br>")
        .replace(/([\.]+) /gm, "$1<br><br>")
        .replace(/<br><br>+/gi, "<br><br>");
      this.$store.commit("UPDATE_TRANSLATION", { index, translation });
      this.focusSelf();
    },
    deleteBlock() {
      this.$store.commit("DELETE_TRANSLATION", this.index);
      this.focusSelf();
    },
    getContent() {
      return this.showOriginal
        ? `${this.original}<br><br>${this.translation}`
        : this.translation;
    },
    copyBlock() {
      const content = this.getContent();
      utils.copyText(content);
      this.focusSelf();
    },
    mouseenter(e) {
      this.rect = e.target.getBoundingClientRect();
      this.hover = true;
    },
    focusSelf() {
      this.$el.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.trans-preview-container__block {
  line-height: 1.5;
  outline: none;
  &:hover {
    background-color: $grey-2;
  }

  &:focus {
    border: 2px dashed $primary-light;
  }

  .toolbar-container {
    padding: 2px 8px;
    height: 26px;
    margin: 4px 0;
    background-color: #fff;
    border: 1px solid $grey-3;
    box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.1);

    /deep/ .q-btn {
      margin: 0px;
    }
    /deep/ .q-btn--dense .on-left {
      margin-right: 2px;
    }
  }

  .block__original {
    padding: 16px 8px 0 8px;
    color: $grey-6;
  }

  .block__translation {
    padding: 16px 8px;
  }

  br {
    content: "";
    display: block;
    margin: 16px;
  }
}
</style>
