import axios from "axios";

const serverUrl = "http://localhost:5000";

const contactApi = {
  getListContact(page, limit) {
    return axios.get(`${serverUrl}/api/contact/list?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
  },
  getListReqContact(page, limit) {
    return axios.get(`${serverUrl}/api/contact/req_list?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
  },
  // search
  searchContact(text, page, limit) {
    return axios.get(
      `${serverUrl}/api/contact/list/search?key=${text}&page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );
  },
  searchReqContact(text, page, limit) {
    return axios.get(
      `${serverUrl}/api/contact/req_list/search?key=${text}&page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );
  },
};

export default contactApi;
