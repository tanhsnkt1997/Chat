import { call, put, takeLatest, fork, all, putResolve, take, select, apply, delay } from "redux-saga/effects";
import {
  LOADING_SEARCH_GROUP,
  GET_LIST_GROUP_CHAT,
  GET_LIST_GROUP_CHAT_SUCESS,
  START_GROUP_SEARCH,
  START_GROUP_SEARCH_SUCCESS,
  GET_LIST_GROUP_SEARCH,
  GET_LIST_GROUP_SEARCH_SUCCESS,
  GET_LIST_GROUP_SEARCH_MORE,
  GET_LIST_GROUP_SEARCH_MORE_SUCCESS,
  // right bar
  GET_LIST_CONTACT_OUTER_GROUP,
  GET_LIST_CONTACT_OUTER_GROUP_SUCCESS,
} from "../action/group";
import groupApi from "../../apiCall/groupApi.js";

function* getListGroupChat(action) {
  try {
    const res = yield call(groupApi.getListGroup, action.payload.page, action.payload.limit);
    yield put({ type: GET_LIST_GROUP_CHAT_SUCESS, payload: res.data });
  } catch (error) {
    console.log("error getListGroupChat", error);
  }
}
//search
function* searchAllRoom(action) {
  yield delay(1000);
  yield put({ type: LOADING_SEARCH_GROUP });
  yield put({ type: START_GROUP_SEARCH_SUCCESS, payload: action.payload });
}

function* getListSearch(action) {
  try {
    let res = yield call(groupApi.searchGroup, action.payload.query, action.payload.page, action.payload.limit);

    yield put({ type: GET_LIST_GROUP_SEARCH_SUCCESS, payload: res.data });
  } catch (error) {
    console.log("error getListSearch group", error);
  }
}

function* getListSearchMore(action) {
  try {
    let res = yield call(groupApi.searchGroup, action.payload.query, action.payload.page, action.payload.limit);

    yield put({ type: GET_LIST_GROUP_SEARCH_MORE_SUCCESS, payload: res.data });
  } catch (error) {
    console.log("error getListSearchMore", error);
  }
}
//right bar
function* getListContactOtherGroup(action) {
  try {
    let res = yield call(groupApi.getListContactOtherRoom, action.payload.roomId);
    yield put({ type: GET_LIST_CONTACT_OUTER_GROUP_SUCCESS, payload: res.data });
  } catch (error) {
    console.log("error getListContactOtherGroup", error);
  }
}

//
function* grouptWatcher() {
  yield takeLatest(GET_LIST_GROUP_CHAT, getListGroupChat);
  //search
  yield takeLatest(START_GROUP_SEARCH, searchAllRoom);
  yield takeLatest(GET_LIST_GROUP_SEARCH, getListSearch);
  yield takeLatest(GET_LIST_GROUP_SEARCH_MORE, getListSearchMore);
  //right bar
  yield takeLatest(GET_LIST_CONTACT_OUTER_GROUP, getListContactOtherGroup);
}

export default grouptWatcher;
