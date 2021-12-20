export const GET_LIST_GROUP_CHAT = "GET_LIST_GROUP_CHAT";
export const GET_LIST_GROUP_CHAT_SUCESS = "GET_LIST_GROUP_CHAT_SUCESS";
// Search
export const LOADING_SEARCH_GROUP = "LOADING_SEARCH_GROUP";
export const START_GROUP_SEARCH = "START_GROUP_SEARCH";
export const START_GROUP_SEARCH_SUCCESS = "START_GROUP_SEARCH_SUCCESS";
export const GET_LIST_GROUP_SEARCH = "GET_LIST_GROUP_SEARCH";
export const GET_LIST_GROUP_SEARCH_SUCCESS = "GET_LIST_GROUP_SEARCH_MORE_SUCCESS";
export const GET_LIST_GROUP_SEARCH_MORE = "GET_LIST_GROUP_SEARCH_MORE";
export const GET_LIST_GROUP_SEARCH_MORE_SUCCESS = "GET_LIST_GROUP_SEARCH_MORE_SUCCESS";
//rightBar
export const GET_LIST_CONTACT_OUTER_GROUP = "GET_LIST_CONTACT_OUTER_ROOM";
export const GET_LIST_CONTACT_OUTER_GROUP_SUCCESS = "GET_LIST_CONTACT_OUTER_ROOM_SUCCESS";

const groupAction = {
  getListGroup(payload) {
    return { type: GET_LIST_GROUP_CHAT, payload };
  },
  groupSearchStart(payload) {
    return { type: START_GROUP_SEARCH, payload };
  },
  getListGroupSearch(payload) {
    return { type: GET_LIST_GROUP_SEARCH, payload };
  },
  getListContactOuterRoom(payload) {
    return { type: GET_LIST_CONTACT_OUTER_GROUP, payload };
  },
  getListGroupSearchMore(payload) {
    return { type: GET_LIST_GROUP_SEARCH_MORE, payload };
  },
};

export default groupAction;
