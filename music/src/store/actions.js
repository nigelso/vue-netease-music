import * as types from "./mutation-types";

export const setPlay = function(
  { commit },
  { playstate, list, index, fullscreen }
) {
  commit(types.SET_CURRENTLIST, list);
  commit(types.SET_FULLSCREEN, fullscreen);
  commit(types.SET_PLAYSTATE, playstate);
  commit(types.SET_CURRENTINDEX, index);
};
