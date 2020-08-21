export default {
  SET_TRANSLATION(state, translation) {
    state.translation = translation;
  },

  APPEND_TRANSLATION(state, translation) {
    state.translation += `${translation}<br><br>`;
  },

  CLEAR_TRANSLATION(state) {
    state.translation = "";
  },

  SET_LOADING(state, status) {
    state.isLoading = status;
  },
};
