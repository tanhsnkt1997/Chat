import axios from "axios";

const serverUrl = "http://localhost:5000";

const settingApi = {
  updateProfile(data) {
    return axios.post(`${serverUrl}/api/setting/update_profile`, data, { withCredentials: true });
  },
  updateAvatar(data) {
    return axios.post(`${serverUrl}/api/setting/update_avatar`, data, { withCredentials: true });
  },
};

export default settingApi;
