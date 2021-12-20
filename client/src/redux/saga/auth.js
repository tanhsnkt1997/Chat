import { call, put, takeLatest, fork, all, putResolve } from "redux-saga/effects";
import authAPi from "../../apiCall/authApi";

import {
  AUTH_FETCH_START,
  AUTH_FETCH_SUCCEED,
  AUTH_FETCH_FAILED,
  AUTH_FETCH_ASYNC,
  CHECK_USER_SESSION,
  LOGIN_FETCH_ASYNC,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
} from "../action/index";

function* registerWorker(action) {
  yield put({ type: AUTH_FETCH_START });
  try {
    const response = yield call(authAPi.register, action.payload);
    yield put({ type: AUTH_FETCH_SUCCEED, payload: response.data });
  } catch (error) {
    yield put({ type: AUTH_FETCH_FAILED, payload: error });
  }
}

function* loginWorker(action) {
  yield put({ type: AUTH_FETCH_START });
  try {
    const response = yield call(authAPi.login, action.payload);
    yield put({ type: AUTH_FETCH_SUCCEED, payload: response.data });
  } catch (error) {
    yield put({ type: AUTH_FETCH_FAILED, payload: error });
  }
}

function* checkSessionWorker() {
  yield put({ type: AUTH_FETCH_START });
  try {
    const response = yield call(authAPi.checkSession);
    yield put({ type: AUTH_FETCH_SUCCEED, payload: response.data });
  } catch (error) {
    yield put({ type: AUTH_FETCH_FAILED, payload: error });
  }
}

function* logoutWorker() {
  try {
    yield call(authAPi.logout);
    yield put({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    console.log("error logoutWorker", error);
  }
}

//---------------------------------watcher----------------------------------
export function* loginWatcher() {
  yield takeLatest(AUTH_FETCH_ASYNC, registerWorker);
  yield takeLatest(LOGIN_FETCH_ASYNC, loginWorker);
}

export function* logoutWatcher() {
  yield takeLatest(LOGOUT_USER, logoutWorker);
}

export function* checkSessionWatcher() {
  yield takeLatest(CHECK_USER_SESSION, checkSessionWorker);
}

function* authWatcher() {
  yield all([call(loginWatcher), call(checkSessionWatcher), call(logoutWatcher)]);
}

export default authWatcher;
// one Watcher
// function* authWatcher() {
//   yield takeLatest(AUTH_FETCH_ASYNC, loginWorker);
// }
