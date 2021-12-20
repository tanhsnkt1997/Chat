import axios from "axios";

const serverUrl = "http://localhost:5000";

const roomApi = {
  creatRoom(data) {
    return axios.post(`${serverUrl}/api/room/creat`, data, { withCredentials: true });
  },
  getListRoom(page, limit) {
    return axios.get(`${serverUrl}/api/room/list?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
  },

  getListImg(room, page, limit) {
    return axios.get(`${serverUrl}/api/room/list_img/${room}?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
  },
  getListVideoAudio(room, page, limit) {
    return axios.get(`${serverUrl}/api/room/list_audio_video/${room}?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
  },
  getListDoc(room, page, limit) {
    return axios.get(`${serverUrl}/api/room/list_doc/${room}?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
  },
  searchAllRoom(text, page, limit) {
    return axios.get(`${serverUrl}/api/room/list/search?key=${text}&page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
  },
  getAllMedia(roomId, messageId, type, limit) {
    return axios.get(`${serverUrl}/api/room/get_all_media/${roomId}/${messageId}?type=${type}&limit=${limit}`, {
      withCredentials: true,
    });
  },
};

export default roomApi;
