import axios from "axios";

export function login(email, password) {
  return axiosGet(`/login?email=${email}&password=${password}`);
}

export function logout() {
  return axiosGet("/logout");
}

export function userDetail(id) {
  return axiosGet(`/user/detail?uid=${id}`);
}

export function userStatus() {
  return axiosGet("/login/status");
}

export function recommendSong() {
  return axiosGet("/recommend/songs");
}

export function singerHot(category, page) {
  return axiosGet(`/top/artists?offset=${page}&limit=50`);
}

export function singerCate(category, page) {
  return axiosGet(`/artist/list?cat=${category}&offset=${page}&limit=50`);
}

export function singerSong(id) {
  return axiosGet(`/artists?id=${id}`);
}

export function musicStatus(id) {
  return axiosGet(`/check/music?id=${id}`);
}

function axiosGet(url) {
  return axios.get(`/api${url}`).then(res => {
    return Promise.resolve(res.data);
  });
}
