import { call, put, takeLatest, fork, all, putResolve, take, select, apply } from "redux-saga/effects";
import {
  SENT_MESSAGE,
  SENT_MESSAGE_SUCCESS,
  GET_LIST_MESSAGE,
  GET_LIST_MESSAGE_SUCCESS,
  SENT_MESSAGE_FILE,
  SENT_MESSAGE_FILE_SUCCESS,
  CLEAR_MESSAGE,
  CLEAR_MESSAGE_SUCCESS,
  GET_LIST_SEARCH_MESSAGE,
  GET_LIST_SEARCH_MESSAGE_SUCCESS,
  SET_INDEX_SEARCH_MESSAGE,
  SET_INDEX_SEARCH_MESSAGE_SUCCESS,
  FIND_LIST_MESSAGE_SEARCH,
  FIND_LIST_MESSAGE_SEARCH_SUCCESS,
  RESET_SEARCH_MESSAGE,
  RESET_SEARCH_MESSAGE_SUCCESS,
  // reply
  SET_MESSAGE_REPLY,
  SET_MESSAGE_REPLY_SUCCESS,
} from "../action/message";
import messageApi from "../../apiCall/message";

export const getProject = (state) => state.auth;
function* sentMessage(action) {
  try {
    let project = yield select(getProject);
    const data = { ...action.payload, userId: project.user._id };
    let messageCreat = yield call(messageApi.sentMessage, data);
    yield put({ type: SENT_MESSAGE_SUCCESS, payload: messageCreat.data });
  } catch (error) {
    console.log("creat message error", error);
  }
}

function* sentMessageFile(action) {
  try {
    let messageCreat = yield call(messageApi.sentMessageFile, action.payload);
    yield put({ type: SENT_MESSAGE_FILE_SUCCESS, payload: messageCreat.data });
  } catch (error) {
    console.log("creat message file error", error);
  }
}

function* getListMessage(action) {
  try {
    let listMessage = yield call(
      messageApi.getListMessage,
      action.payload.chatRoomId,
      action.payload.page,
      action.payload.limit
    );
    yield put({ type: GET_LIST_MESSAGE_SUCCESS, payload: listMessage.data });
  } catch (error) {
    console.log("get list message error", error);
  }
}

function* clearMessage() {
  yield put({ type: CLEAR_MESSAGE_SUCCESS });
}

function* getListSearchMessage(action) {
  try {
    let messageSearch = yield call(
      messageApi.searchMessage,
      action.payload.keyword,
      action.payload.chatRoomId,
      action.payload.page,
      action.payload.limit
    );
    yield put({ type: GET_LIST_SEARCH_MESSAGE_SUCCESS, payload: messageSearch.data });
  } catch (error) {
    console.log("error getListSearchMessage", error);
  }
}

function* setIndexSearchMessage(action) {
  yield put({ type: SET_INDEX_SEARCH_MESSAGE_SUCCESS, payload: action.payload });
}

function* findListMessageSearch(action) {
  try {
    //clear list message before get new list search
    yield put({ type: CLEAR_MESSAGE_SUCCESS });
    let messageFind = yield call(
      messageApi.findListMessageSearch,
      action.payload.messageId,
      action.payload.roomId,
      action.payload.type,
      action.payload.limit
    );
    yield put({ type: FIND_LIST_MESSAGE_SEARCH_SUCCESS, payload: messageFind.data });
  } catch (error) {
    console.log("error findListMessageSearch", error);
  }
}

function* resetSearchMessage() {
  yield put({ type: RESET_SEARCH_MESSAGE_SUCCESS });
}

function* setMessageReply(action) {
  yield put({ type: SET_MESSAGE_REPLY_SUCCESS, payload: action.payload });
}

//
function* messageWatcher() {
  yield takeLatest(CLEAR_MESSAGE, clearMessage);
  yield takeLatest(SENT_MESSAGE, sentMessage);
  yield takeLatest(SENT_MESSAGE_FILE, sentMessageFile);
  yield takeLatest(GET_LIST_MESSAGE, getListMessage);
  yield takeLatest(GET_LIST_SEARCH_MESSAGE, getListSearchMessage);
  yield takeLatest(SET_INDEX_SEARCH_MESSAGE, setIndexSearchMessage);
  yield takeLatest(FIND_LIST_MESSAGE_SEARCH, findListMessageSearch);
  yield takeLatest(RESET_SEARCH_MESSAGE, resetSearchMessage);
  yield takeLatest(SET_MESSAGE_REPLY, setMessageReply);
}

export default messageWatcher;
