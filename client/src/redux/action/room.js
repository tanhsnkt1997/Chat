export const GET_LIST_ROOM_CHAT = "GET_LIST_ROOM_CHAT";
export const GET_LIST_ROOM_CHAT_SUCCESS = "GET_LIST_ROOM_CHAT_SUCCESS";
// export const GET_LIST_CONTACT_OUTER_ROOM = "GET_LIST_CONTACT_OUTER_ROOM";
// export const GET_LIST_CONTACT_OUTER_ROOM_SUCCESS = "GET_LIST_CONTACT_OUTER_ROOM_SUCCESS";

export const GET_LIST_IMG_ROOM = "GET_LIST_IMG_ROOM";
export const GET_LIST_IMG_ROOM_SUCCESS = "GET_LIST_IMG_ROOM_SUCCESS";
export const GET_LIST_VIDEO_AUDIO_ROOM = "GET_LIST_VIDEO_AUDIO_ROOM";
export const GET_LIST_VIDEO_AUDIO_ROOM_SUCCESS = "GET_LIST_VIDEO_AUDIO_ROOM_SUCCESS";
export const GET_LIST_DOC_ROOM = "GET_LIST_DOC_ROOM";
export const GET_LIST_DOC_ROOM_SUCCESS = "GET_LIST_DOC_ROOM_SUCCESS";

export const SET_CURRENT_ROOM = "SET_CURRENT_ROOM";
export const SET_CURRENT_ROOM_SUCCESS = "SET_CURRENT_ROOM_SUCCESS";

// Search
export const LOADING_SEARCH_ROOM = "LOADING_SEARCH_ROOM";
export const IS_SEARCHING = "IS_SEARCHING";
export const SEARCH_ALL_ROOM = "SEARCH_ALL_ROOM";
export const GET_LIST_ROOM_SEARCH = "GET_LIST_ROOM_SEARCH";
export const GET_LIST_ROOM_SEARCH_SUCCESS = "GET_LIST_ROOM_SEARCH_SUCCESS";
export const GET_LIST_ROOM_SEARCH_FORWARD_SUCCESS = "GET_LIST_ROOM_SEARCH_FORWARD_SUCCESS";
export const GET_LIST_ROOM_SEARCH_MORE = "GET_LIST_ROOM_SEARCH_MORE";
export const GET_LIST_ROOM_SEARCH_MORE_SUCCESS = "GET_LIST_ROOM_SEARCH_MORE_SUCCESS";
//
export const GET_ALL_MULTIMEDIA = "GET_ALL_MULTIMEDIA";
export const GET_ALL_MULTIMEDIA_SUCCESS = "GET_ALL_MULTIMEDIA_SUCCESS";

const room = {
  getListRoomChat(payload) {
    return { type: GET_LIST_ROOM_CHAT, payload };
  },
  // getListContactOuterRoom(payload) {
  //   return { type: GET_LIST_CONTACT_OUTER_ROOM, payload };
  // },
  setCurrentRoom(payload) {
    return { type: SET_CURRENT_ROOM, payload };
  },
  getListImgRoom(payload) {
    return { type: GET_LIST_IMG_ROOM, payload };
  },
  getListVideoAudioRoom(payload) {
    return { type: GET_LIST_VIDEO_AUDIO_ROOM, payload };
  },
  getLisDocRoom(payload) {
    return { type: GET_LIST_DOC_ROOM, payload };
  },
  //search
  searchAllRoom(payload) {
    return { type: SEARCH_ALL_ROOM, payload };
  },
  getListRoomSearch(payload) {
    return { type: GET_LIST_ROOM_SEARCH, payload };
  },
  getListRoomSearchMore(payload) {
    return { type: GET_LIST_ROOM_SEARCH_MORE, payload };
  },
  getAllMultimedia(payload) {
    return { type: GET_ALL_MULTIMEDIA, payload };
  },
};

export default room;
