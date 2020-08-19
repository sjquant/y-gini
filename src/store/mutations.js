export default {
  APPEND_TRANSLATION(state, translation) {
    state.translation += `${translation}<br><br>`;
  },

  CLEAR_TRANSLATION(state) {
    state.translation = ""
  }
};
