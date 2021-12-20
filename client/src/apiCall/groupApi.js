import axios from "axios";

const serverUrl = "http://localhost:5000";

const groupApi = {
  getListGroup(page, limit) {
    return axios.get(`${serverUrl}/api/group/list?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
  },
  searchGroup(text, page, limit) {
    return axios.get(`${serverUrl}/api/group/list/search?key=${text}&page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
  },
  // setting
  changeNameGroup(name) {
    return axios.patch(`${serverUrl}/api/group/setting/change_name_group`, name, {
      withCredentials: true,
    });
  },
  changeAvatarGroup(data) {
    //data is formData
    return axios.patch(`${serverUrl}/api/group/setting/change_avatar_group`, data, {
      withCredentials: true,
    });
  },
  getListContactOtherRoom(data) {
    return axios.get(`${serverUrl}/api/group/list_member_outer/${data}`, { withCredentials: true });
  },
  addContactToGroup(data) {
    return axios.post(`${serverUrl}/api/group/add_member_group`, data, { withCredentials: true });
  },
  leaveGroup(data) {
    return axios.delete(`${serverUrl}/api/group/setting/leaveRoom/${data.currenRoomId}`, {
      withCredentials: true,
    });
  },
};

export default groupApi;
