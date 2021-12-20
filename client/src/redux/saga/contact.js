import {
  call,
  put,
  takeLatest,
  fork,
  all,
  putResolve,
  take,
  select,
  apply,
  delay,
} from "redux-saga/effects";
import {
  GET_LIST_CONTACT,
  GET_LIST_CONTACT_SUCCESS,
  GET_LIST_REQUEST_CONTACT,
  GET_LIST_REQUEST_CONTACT_SUCCESS,
  // Search
  LOADING_SEARCH_CONTACT,
  START_CONTACT_SEARCH,
  START_CONTACT_SEARCH_SUCCESS,
  GET_LIST_CONTACT_SEARCH,
  GET_LIST_CONTACT_SEARCH_SUCCESS,
  GET_LIST_CONTACT_SEARCH_MORE,
  GET_LIST_CONTACT_SEARCH_MORE_SUCCESS,
  LOADING_SEARCH_REQ_CONTACT,
  GET_LIST_REQ_CONTACT_SEARCH,
  GET_LIST_REQ_CONTACT_SEARCH_SUCCESS,
  GET_LIST_REQ_CONTACT_SEARCH_MORE,
  GET_LIST_REQ_CONTACT_SEARCH_MORE_SUCCESS,
} from "../action/contact";

import contactApi from "../../apiCall/contactApi";

export const getProject = (state) => state.auth;

function handleFilterData(list) {
  return new Promise((resolve, reject) => {
    const filterFriend = list.reduce(
      (acc, curr, index, arr) => {
        if (curr.status) {
          acc.listFriend.push(curr);
        } else {
          acc.ReqFriend.push(curr);
        }
        return acc;
      },
      { listFriend: [], ReqFriend: [] }
    );
    console.log("filterFriend===>>", filterFriend);
    resolve(filterFriend);
  });
}

function* getListContact(action) {
  try {
    // let project = yield select(getProject);
    let res = yield call(contactApi.getListContact, action.payload.page, action.payload.limit);
    // const filterData = yield call(handleFilterData, res.data);
    yield put({ type: GET_LIST_CONTACT_SUCCESS, payload: res.data });
  } catch (error) {}
}

function* getListRequestContact(action) {
  try {
    let res = yield call(contactApi.getListReqContact, action.payload.page, action.payload.limit);
    yield put({ type: GET_LIST_REQUEST_CONTACT_SUCCESS, payload: res.data });
  } catch (error) {
    console.log("getListRequestContact errror:", error);
  }
}

// userOnline
function filterUserOnline(dataPayload, userId) {
  return new Promise((resolve, reject) => {
    const { listUserOnline, listFriend } = dataPayload;
    let data = listFriend.filter((friend) => {
      if (friend.userId === userId) {
        return Object.keys(listUserOnline).some((id) => {
          if (friend.contactId === id) {
            friend.isOnline = true;
            return true;
          }
          friend.isOnline = false;
          return false;
        });
      } else {
        return Object.keys(listUserOnline).some((id) => {
          if (friend.userId === id) {
            friend.isOnline = true;
            return true;
          }
          friend.isOnline = false;
          return false;
        });
      }
    });
    console.log("data online", data);
    resolve(data);
  });
}
//search
function* searchAllRoom(action) {
  yield delay(1000);
  if (action.payload.typeSearch === "Friends") {
    yield put({ type: LOADING_SEARCH_CONTACT });
  } else {
    yield put({ type: LOADING_SEARCH_REQ_CONTACT });
  }
  yield put({ type: START_CONTACT_SEARCH_SUCCESS, payload: action.payload });
}

function* getListSearch(action) {
  try {
    let res = yield call(
      contactApi.searchContact,
      action.payload.query,
      action.payload.page,
      action.payload.limit
    );
    yield put({ type: GET_LIST_CONTACT_SEARCH_SUCCESS, payload: res.data });
  } catch (error) {
    console.log("error getListSearch contact", error);
  }
}

function* getListSearchMore(action) {
  try {
    let res = yield call(
      contactApi.searchContact,
      action.payload.query,
      action.payload.page,
      action.payload.limit
    );

    yield put({ type: GET_LIST_CONTACT_SEARCH_MORE_SUCCESS, payload: res.data });
  } catch (error) {
    console.log("error getListSearchMore", error);
  }
}

function* getListReqSearch(action) {
  try {
    let res = yield call(
      contactApi.searchReqContact,
      action.payload.query,
      action.payload.page,
      action.payload.limit
    );
    yield put({ type: GET_LIST_REQ_CONTACT_SEARCH_SUCCESS, payload: res.data });
  } catch (error) {
    console.log("error getListSearch req", error);
  }
}

function* getListReqSearchMore(action) {
  try {
    let res = yield call(
      contactApi.searchReqContact,
      action.payload.query,
      action.payload.page,
      action.payload.limit
    );

    yield put({ type: GET_LIST_REQ_CONTACT_SEARCH_MORE_SUCCESS, payload: res.data });
  } catch (error) {
    console.log("error getListSearchMore", error);
  }
}

//
function* contactWatcher() {
  yield takeLatest(GET_LIST_CONTACT, getListContact);
  yield takeLatest(GET_LIST_REQUEST_CONTACT, getListRequestContact);
  //search
  yield takeLatest(START_CONTACT_SEARCH, searchAllRoom);
  yield takeLatest(GET_LIST_CONTACT_SEARCH, getListSearch);
  yield takeLatest(GET_LIST_CONTACT_SEARCH_MORE, getListSearchMore);
  yield takeLatest(GET_LIST_REQ_CONTACT_SEARCH, getListReqSearch);
  yield takeLatest(GET_LIST_REQ_CONTACT_SEARCH_MORE, getListReqSearchMore);
}

export default contactWatcher;
