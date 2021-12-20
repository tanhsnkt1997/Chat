import axios from "axios";

const serverUrl = "http://localhost:5000";

const messageApi = {
  sentMessage(data) {
    return axios.post(`${serverUrl}/api/message/creat_text`, data, { withCredentials: true });
  },
  sentMessageFile(data) {
    return axios.post(`${serverUrl}/api/message/creat_file`, data, { withCredentials: true });
  },
  sentMessageLike(data) {
    return axios.post(`${serverUrl}/api/message/like`, data, { withCredentials: true });
  },
  sentMessageFileForward(data) {
    return axios.post(`${serverUrl}/api/message/creat_file_forward`, data, { withCredentials: true });
  },
  removeMessage(data) {
    return axios.delete(`${serverUrl}/api/message/remove/${data.messageId}`, { withCredentials: true });
  },

  getListMessage(roomId, page, limit) {
    return axios.get(`${serverUrl}/api/message/get_list/${roomId}?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
  },
  sentReaction(data) {
    return axios.post(`${serverUrl}/api/message/sent-reaction`, data, { withCredentials: true });
  },
  searchMessage(keyword, roomId, page, limit) {
    return axios.get(`${serverUrl}/api/message/get_list_search/${roomId}?key=${keyword}&page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
  },
  findListMessageSearch(messageId, roomId, type, limit) {
    return axios.get(`${serverUrl}/api/message/get_data_search/${roomId}/${messageId}?type=${type}&limit=${limit}`, {
      withCredentials: true,
    });
  },
};

export default messageApi;
