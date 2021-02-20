import Vue from "vue";

export default {
  UPDATE_TRANSLATION(state, { index, translation }) {
    Vue.set(state.translations, index, translation);
  },

  APPEND_TRANSLATION(state, translation) {
    state.translations.push(`${translation}<br><br>`);
  },

  CLEAR_TRANSLATION(state) {
    state.translations = [];
  },

  SET_LOADING(state, status) {
    state.isLoading = status;
  },

  UPDATE_SETTING(state, obj) {
    state.setting = { ...state.setting, ...obj };
    localStorage.setItem("setting", JSON.stringify(state.setting));
  },
};
