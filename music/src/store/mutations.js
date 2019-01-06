import * as types from "./mutation-types";

const mutations = {
  [types.SET_PROFILE](state, profile) {
    state.profile = profile;
  },
  [types.SET_PLAYSTATE](state, flag) {
    state.playState = flag;
  },
  [types.SET_FULLSCREEN](state, flag) {
    state.fullScreen = flag;
  },
  [types.SET_CURRENTINDEX](state, index) {
    state.currentIndex = index;
  },
  [types.SET_CURRENTLIST](state, list) {
    state.currentList = list;
  }
};
export default mutations;
