import axios from "axios";

const serverUrl = "http://localhost:5000";

const auth = {
  register(payload) {
    return axios.post(`${serverUrl}/api/auth/register`, payload, { withCredentials: true });
  },

  login(payload) {
    return axios.post(`${serverUrl}/api/auth/login`, payload, { withCredentials: true });
  },

  checkSession() {
    return axios.get(`${serverUrl}/api/auth/login_check`, {
      withCredentials: true,
    });
  },
  logout() {
    return axios.get(`${serverUrl}/api/auth/logout`, {
      withCredentials: true,
    });
  },
};

export default auth;
