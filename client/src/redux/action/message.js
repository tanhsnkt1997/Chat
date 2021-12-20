export const CLEAR_MESSAGE = "CLEAR_MESSAGE";
export const CLEAR_MESSAGE_SUCCESS = "CLEAR_MESSAGE_SUCCESS";
export const SENT_MESSAGE = "SENT_MESSAGE";
export const SENT_MESSAGE_SUCCESS = "SENT_MESSAGE_SUCCESS";
export const SENT_MESSAGE_FILE = "SENT_MESSAGE_FILE";
export const SENT_MESSAGE_FILE_SUCCESS = "SENT_MESSAGE_FILE_SUCCESS";
export const GET_LIST_MESSAGE = "GET_LIST_MESSAGE";
export const GET_LIST_MESSAGE_SUCCESS = "GET_LIST_MESSAGE_SUCCESS";
export const GET_LIST_SEARCH_MESSAGE = "GET_LIST_SEARCH_MESSAGE";
export const GET_LIST_SEARCH_MESSAGE_SUCCESS = "GET_LIST_SEARCH_MESSAGE_SUCCESS";
export const SET_INDEX_SEARCH_MESSAGE = "SET_INDEX_SEARCH_MESSAGE";
export const SET_INDEX_SEARCH_MESSAGE_SUCCESS = "SET_INDEX_SEARCH_MESSAGE_SUCCESS";
export const FIND_LIST_MESSAGE_SEARCH = "FIND_LIST_MESSAGE_SEARCH";
export const FIND_LIST_MESSAGE_SEARCH_SUCCESS = "FIND_LIST_MESSAGE_SEARCH_SUCCESS";
export const RESET_SEARCH_MESSAGE = "RESET_SEARCH_MESSAGE";
export const RESET_SEARCH_MESSAGE_SUCCESS = "RESET_SEARCH_MESSAGE_SUCCESS";
// reply
export const SET_MESSAGE_REPLY = "SET_MESSAGE_REPLY";
export const SET_MESSAGE_REPLY_SUCCESS = "SET_MESSAGE_REPLY_SUCCESS";
// reaction
export const GET_LIST_REACTION = "GET_LIST_REACTION";
export const GET_LIST_REACTION_SUCCESS = "GET_LIST_REACTION_SUCCESS";

const messageAction = {
  clearMessage() {
    return { type: CLEAR_MESSAGE };
  },
  sentMessge(payload) {
    return { type: SENT_MESSAGE, payload };
  },
  sentMessageFile(payload) {
    return { type: SENT_MESSAGE_FILE, payload };
  },
  getListMessage(payload) {
    return { type: GET_LIST_MESSAGE, payload };
  },
  getListReaction(payload) {
    return { type: GET_LIST_REACTION, payload };
  },
  searchMessage(payload) {
    return { type: GET_LIST_SEARCH_MESSAGE, payload };
  },
  setIndexSearchMessage(payload) {
    return { type: SET_INDEX_SEARCH_MESSAGE, payload };
  },
  findListMessageSearch(payload) {
    return { type: FIND_LIST_MESSAGE_SEARCH, payload };
  },
  resetSearch() {
    return { type: RESET_SEARCH_MESSAGE };
  },
  messageReply(payload) {
    return { type: SET_MESSAGE_REPLY, payload };
  },
};

export default messageAction;
