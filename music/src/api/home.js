import axios from "axios";

export function getBanner() {
  return axiosGet("/banner");
}

export function getRecommendList(before) {
  return axiosGet(`/top/playlist/highquality?before=${before}&limit=20`);
}

export function getSongList(aid) {
  return axiosGet(`/playlist/detail?id=${aid}`);
}

export function getPlayList(limit) {
  return axiosGet(`/top/playlist?limit=${limit}`);
}

export function songDetail(id) {
  return axiosGet(`/song/detail?ids=${id}`);
}

export function songUrl(id) {
  return axiosGet(`/song/url?id=${id}`);
}

function axiosGet(url) {
  return axios.get(`/api${url}`).then(res => {
    return Promise.resolve(res.data);
  });
}
