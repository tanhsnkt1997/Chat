import { call, put, takeLatest, fork, all, putResolve, take, select, apply, delay } from "redux-saga/effects";
import roomApi from "../../apiCall/roomApi";
import {
  GET_LIST_ROOM_CHAT,
  GET_LIST_ROOM_CHAT_SUCCESS,
  SET_CURRENT_ROOM,
  SET_CURRENT_ROOM_SUCCESS,
  GET_LIST_IMG_ROOM,
  GET_LIST_IMG_ROOM_SUCCESS,
  GET_LIST_VIDEO_AUDIO_ROOM,
  GET_LIST_VIDEO_AUDIO_ROOM_SUCCESS,
  GET_LIST_DOC_ROOM,
  GET_LIST_DOC_ROOM_SUCCESS,
  // Search
  LOADING_SEARCH_ROOM,
  IS_SEARCHING,
  SEARCH_ALL_ROOM,
  GET_LIST_ROOM_SEARCH,
  GET_LIST_ROOM_SEARCH_SUCCESS,
  GET_LIST_ROOM_SEARCH_FORWARD_SUCCESS,
  GET_LIST_ROOM_SEARCH_MORE,
  GET_LIST_ROOM_SEARCH_MORE_SUCCESS,
  //
  GET_ALL_MULTIMEDIA,
  GET_ALL_MULTIMEDIA_SUCCESS,
} from "../action/room";

function* getListRoomChat(action) {
  try {
    let res = yield call(roomApi.getListRoom, action.payload.page, action.payload.limit);
    yield put({ type: GET_LIST_ROOM_CHAT_SUCCESS, payload: res.data });
  } catch (error) {
    console.log("error getListRoomChat", error);
  }
}

function* setCurrentRoom(action) {
  yield put({ type: SET_CURRENT_ROOM_SUCCESS, payload: action.payload });
}

//get file in room
function* getListImgRoom(action) {
  try {
    let res = yield call(roomApi.getListImg, action.payload.roomId, action.payload.page, action.payload.limit);
    yield put({ type: GET_LIST_IMG_ROOM_SUCCESS, payload: res.data });
  } catch (error) {
    console.log("error getListImgRoom", error);
  }
}

function* getListVideoAudioRoom(action) {
  try {
    let res = yield call(roomApi.getListVideoAudio, action.payload.roomId, action.payload.page, action.payload.limit);
    yield put({ type: GET_LIST_VIDEO_AUDIO_ROOM_SUCCESS, payload: res.data });
  } catch (error) {
    console.log("error getListVideoAudioRoom", error);
  }
}

function* getListDocRoom(action) {
  try {
    let res = yield call(roomApi.getListDoc, action.payload.roomId, action.payload.page, action.payload.limit);
    yield put({ type: GET_LIST_DOC_ROOM_SUCCESS, payload: res.data });
  } catch (error) {
    console.log("error getListDocRoom", error);
  }
}

// Search
function* searchAllRoom(action) {
  yield delay(1000);
  yield put({ type: LOADING_SEARCH_ROOM });
  yield put({ type: IS_SEARCHING, payload: action.payload });
}

function* getListSearch(action) {
  try {
    let res = yield call(roomApi.searchAllRoom, action.payload.query, action.payload.page, action.payload.limit);
    if (action.payload.type === "forward") {
      yield put({ type: GET_LIST_ROOM_SEARCH_FORWARD_SUCCESS, payload: res.data });
    } else {
      yield put({ type: GET_LIST_ROOM_SEARCH_SUCCESS, payload: res.data });
    }
  } catch (error) {
    console.log("error getListSearch room", error);
  }
}

function* getListSearchMore(action) {
  try {
    let res = yield call(roomApi.searchAllRoom, action.payload.query, action.payload.page, action.payload.limit);

    yield put({ type: GET_LIST_ROOM_SEARCH_MORE_SUCCESS, payload: res.data });
  } catch (error) {
    console.log("error getListSearchMore", error);
  }
}

function* getAllMultimedia(action) {
  let allMedia = yield call(
    roomApi.getAllMedia,
    action.payload.chatRoomId,
    action.payload.messageId,
    action.payload.type,
    action.payload.limit
  );
  yield put({ type: GET_ALL_MULTIMEDIA_SUCCESS, payload: allMedia.data });
}

//
function* roomWatcher() {
  yield takeLatest(GET_LIST_ROOM_CHAT, getListRoomChat);
  yield takeLatest(SET_CURRENT_ROOM, setCurrentRoom);
  yield takeLatest(GET_LIST_IMG_ROOM, getListImgRoom);
  yield takeLatest(GET_LIST_VIDEO_AUDIO_ROOM, getListVideoAudioRoom);
  yield takeLatest(GET_LIST_DOC_ROOM, getListDocRoom);
  //search
  yield takeLatest(SEARCH_ALL_ROOM, searchAllRoom);
  yield takeLatest(GET_LIST_ROOM_SEARCH, getListSearch);
  yield takeLatest(GET_LIST_ROOM_SEARCH_MORE, getListSearchMore);
  yield takeLatest(GET_ALL_MULTIMEDIA, getAllMultimedia);
}

export default roomWatcher;
