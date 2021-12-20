import { combineReducers } from "redux";
import auth from "./auth";
import contact from "./contact";
import room from "./room";
import message from "./message";
import setting from "./setting";
import group from "./group";

export default combineReducers({
  auth,
  contact,
  room,
  message,
  setting,
  group,
});
