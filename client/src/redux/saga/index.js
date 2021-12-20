import { all, fork } from "redux-saga/effects";
import authSaga from "./auth";
import socketSaga from "./socket";
import contactSaga from "./contact";
import messageSaga from "./message";
import roomSaga from "./room";
import groupSaga from "./group";
import settingSaga from "./setting";

export default function* rootSaga() {
  // yield all([...barSagas]);
  // yield all([fork(socketSaga)]);
  yield all([
    authSaga(),
    socketSaga(),
    contactSaga(),
    messageSaga(),
    roomSaga(),
    groupSaga(),
    settingSaga(),
  ]);
  // code after all-effect
}
