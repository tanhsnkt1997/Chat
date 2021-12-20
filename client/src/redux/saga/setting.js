import { call, put, takeLatest, fork, all, putResolve, take, select, apply } from "redux-saga/effects";
import {
  START_UPDATE_PROFILE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_AVATAR,
  UPDATE_AVATAR_SUCCESS,
} from "../action/setting";
import groupApi from "../../apiCall/settingApi";

function* updateProfile(action) {
  yield put({ type: START_UPDATE_PROFILE });
  let res = yield call(groupApi.updateProfile, action.payload);
  yield put({ type: UPDATE_PROFILE_SUCCESS, payload: res.data });
}

function* updateAvatar(action) {
  let res = yield call(groupApi.updateAvatar, action.payload);
  yield put({ type: UPDATE_AVATAR_SUCCESS, payload: res.data });
}

//
function* settingWatcher() {
  yield takeLatest(UPDATE_PROFILE, updateProfile);
  yield takeLatest(UPDATE_AVATAR, updateAvatar);
}

export default settingWatcher;
