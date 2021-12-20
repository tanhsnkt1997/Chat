export const GET_LIST_CONTACT = "GET_LIST_CONTACT";
export const GET_LIST_CONTACT_SUCCESS = "GET_LIST_CONTACT_SUCCESS";
export const GET_LIST_REQUEST_CONTACT = "GET_LIST_REQUEST_CONTACT";
export const GET_LIST_REQUEST_CONTACT_SUCCESS = "GET_LIST_REQUEST_CONTACT_SUCCESS";
// Search
export const LOADING_SEARCH_CONTACT = "LOADING_SEARCH_CONTACT";
export const START_CONTACT_SEARCH = "START_CONTACT_SEARCH";
export const START_CONTACT_SEARCH_SUCCESS = "START_CONTACT_SEARCH_SUCCESS";
export const GET_LIST_CONTACT_SEARCH = "GET_LIST_CONTACT_SEARCH";
export const GET_LIST_CONTACT_SEARCH_SUCCESS = "GET_LIST_CONTACT_SEARCH_SUCCESS";
export const GET_LIST_CONTACT_SEARCH_MORE = "GET_LIST_CONTACT_SEARCH_MORE";
export const GET_LIST_CONTACT_SEARCH_MORE_SUCCESS = "GET_LIST_CONTACT_SEARCH_MORE_SUCCESS";
export const LOADING_SEARCH_REQ_CONTACT = "LOADING_SEARCH_REQ_CONTACT";
export const GET_LIST_REQ_CONTACT_SEARCH = "GET_LIST_REQ_CONTACT_SEARCH";
export const GET_LIST_REQ_CONTACT_SEARCH_SUCCESS = "GET_LIST_REQ_CONTACT_SEARCH_SUCCESS";
export const GET_LIST_REQ_CONTACT_SEARCH_MORE = "GET_LIST_REQ_CONTACT_SEARCH_MORE";
export const GET_LIST_REQ_CONTACT_SEARCH_MORE_SUCCESS = "GET_LIST_REQ_CONTACT_SEARCH_MORE_SUCCESS";

const contactAction = {
  getListContact(payload) {
    return { type: GET_LIST_CONTACT, payload };
  },
  getListRequestContact(payload) {
    return { type: GET_LIST_REQUEST_CONTACT, payload };
  },
  // search
  searchStart(payload) {
    return { type: START_CONTACT_SEARCH, payload };
  },
  getListFriendSearch(payload) {
    return { type: GET_LIST_CONTACT_SEARCH, payload };
  },
  getListFriendSearchMore(payload) {
    return { type: GET_LIST_CONTACT_SEARCH_MORE, payload };
  },
  getListReqFriendSearch(payload) {
    return { type: GET_LIST_REQ_CONTACT_SEARCH, payload };
  },
  getListReqFriendSearchMore(payload) {
    return { type: GET_LIST_REQ_CONTACT_SEARCH_MORE, payload };
  },
};

export default contactAction;
