export const profile = state => state.profile;
export const playState = state => state.playState;
export const fullScreen = state => state.fullScreen;
export const currentIndex = state => state.currentIndex;
export const currentList = state => state.currentList;
export const currentSong = state => {
  return state.currentList[state.currentIndex] || {};
};
