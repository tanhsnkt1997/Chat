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
  takeEvery,
} from "redux-saga/effects";
import io from "socket.io-client";
import {
  CONNECT_SOCKET,
  REQ_ADDFRIEND_SOCKET,
  RES_ADDFRIEND_SOCKET,
  REQ_ACCEPT_FRIEND_SOCKET,
  RES_ACCEPT_FRIEND_SOCKET,
  REQ_REJECT_FRIEND_SOCKET,
  REQ_REJECT_FRIEND_SOCKET_SUCCESS,
  RES_REJECT_FRIEND_SOCKET,
  REQ_ACCEPT_FRIEND_SOCKET_SUCCESS,
  RES_USER_ONLINE,
  RES_USER_OFFLINE,
  CREAT_ROM_CHAT,
  FETCHING_CREAT_ROM_CHAT,
  CREAT_ROOM_CHAT_SUCCESS,
  CREAT_ROOM_CHAT_ERROR,
  UPDATED_ROOM_LAST_MESSAGE,
  JOIN_ROOM_CHAT,
  //sent message
  REQ_SENT_MESSAGE_TEXT_SOCKET,
  REQ_SENT_MESSAGE_FILE_SOCKET,
  REQ_SENT_MESSAGE_LIKE_SOCKET,
  RES_SENT_MESSAGE_SOCKET_SUCCCESS,
  REQ_SENT_MESSAGE_FILE_FORWARD_SOCKET,
  REQ_REMOVE_MESSAGE_SOCKET,
  RES_REMOVE_MESSAGE_SOCKET_SUCCESS,
  UPDATED_ROOM_COUNT_UNREAD_MESSAGE,
  //
  REQ_CALL_USER,
  RES_CALL_USER,
  REQ_CANCEL_VIDEO_CALL,
  RES_CANCEL_VIDEO_CALL_SUCCESS,
  REQ_REJECT_CALL,
  RES_REJECT_CALL_SUCCESS,
  REQ_ACCEPT_VIDEO_CALL,
  REQ_ACCEPT_VIDEO_CALL_SUCCESS,
  //
  REQ_GROUP_START_CALL,
  RES_GROUP_START_CALL,
  REQ_JOIN_ROOM_CALL,
  RES_ALL_USER_GROUP_CALL,
  REQ_SENDING_SIGNAL_GROUP_CALL,
  RES_USER_JOINED_GROUP_CALL,
  REQ_RETURN_SIGNAL_GROUP_CALL,
  RES_RECEIVING_RETURNED_SIGNAL_GROUP_CALL,
  REQ_CANCEL_SIGNAL_GROUP_CALL,
  RES_CANCEL_SIGNAL_GROUP_CALL,
  //reaction
  REQ_SENT_REACTION,
  RES_SENT_REACTION_SUCCESS,
  //setting
  REQ_CHANGE_NAME_GROUP,
  RES_CHANGE_NAME_GROUP_SUCCESS,
  REQ_CHANGE_AVATAR_GROUP,
  RES_CHANGE_AVATAR_GROUP_SUCCESS,
  REQ_LEAVE_GROUP,
  RES_LEAVE_GROUP_AXIOS_SUCCESS,
  RES_LEAVE_GROUP_SUCCESS,
  ADD_MEMBER_GROUP_CHAT,
  ADD_MEMBER_GROUP_CHAT_SUCCESS,
  RES_ADD_MEMBER_GROUP_AXIOS_SUCCESS,
} from "../action/socket";
import roomApi from "../../apiCall/roomApi";
import messageApi from "../../apiCall/message";
import groupApi from "../../apiCall/groupApi";

import {
  addFrienndChannel,
  acceptFrienndChannel,
  rejecttFrienndChannel,
  userOnline,
  userOffline,
  creatRoomSocket,
  addMemberToGroup,
  //direct call
  callUserChannel,
  callAcceptChannel,
  rejectCallSocket,
  //message
  listMessageSocket,
  removeMessageSocket,
  notifSentMessage,
  // group call
  startGroupCall,
  allUserGroupCall,
  userJoinGroupSignal,
  receivingGroupSignal,
  receivingCancelGroupSignal,
  //reaction
  reactionFromSocket,
  //setting
  changeNameGroupSocket,
  changeAvatarGroupSocket,
  leaveGroupSocket,
} from "../channels/chatChannel";

export const getProject = (state) => state.auth;
export const getRoomState = (state) => state.room.listRoom;

function connect() {
  const SOCKET_URL = "http://localhost:5000/";
  //io() or io.connect()
  const socket = io.connect(SOCKET_URL, {
    reconnection: true,
    reconnectionDelay: 3000,
    reconnectionAttempts: 30,
    forceNew: true,
    transports: ["websocket"],
    closeOnBeforeunload: false,
    // query: { userId },
  });
  return new Promise((resolve, reject) => {
    socket.on("connect", () => {
      resolve(socket);
      console.log("Socket connected");
    });

    socket.on("error", (err) => {
      console.log("connect socket error", err);
      reject(null);
    });
  });
}

function* getListUserOnline(socket) {
  const chanel = yield call(userOnline, socket);
  try {
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_USER_ONLINE, payload: data });
    }
  } catch (error) {
    console.log("error getListUserOnline", error);
  }
}

function* getListUserOffline(socket) {
  const chanel = yield call(userOffline, socket);
  try {
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_USER_OFFLINE, payload: data });
    }
  } catch (error) {
    console.log("error getListUserOffline", error);
  }
}

function* requestAddFriend(socket) {
  try {
    const chanel = yield call(addFrienndChannel, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_ADDFRIEND_SOCKET, payload: data });
    }
  } catch (error) {
    console.log("error resAddFriend", error);
  }
}

function* resAddFriend(socket, action) {
  try {
    const { email, message } = action.payload;
    yield apply(socket, socket.emit, ["req-add-friend", { email, message }]);
  } catch (error) {
    console.log("error resAddFriend", error);
  }
}

function* reqAcceptFriend(socket, action) {
  try {
    const { _id } = action.payload;
    yield apply(socket, socket.emit, ["req-accept-friend", { id: _id }]);
    yield put({ type: REQ_ACCEPT_FRIEND_SOCKET_SUCCESS, payload: action.payload });
  } catch (error) {
    console.log("error resAcceptFriend", error);
  }
}

function* resAcceptFriend(socket) {
  try {
    const chanel = yield call(acceptFrienndChannel, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_ACCEPT_FRIEND_SOCKET, payload: data });
    }
  } catch (error) {
    console.log("error resAcceptFriend", error);
  }
}

function* reqRejectFriend(socket, action) {
  try {
    const { id } = action.payload;
    yield apply(socket, socket.emit, ["req-reject-friend", { id }]);
    yield put({ type: REQ_REJECT_FRIEND_SOCKET_SUCCESS, payload: id });
  } catch (error) {
    console.log("error resRejectFriend", error);
  }
}
// "res-reject-friend"
function* resRejectFriend(socket) {
  try {
    const chanel = yield call(rejecttFrienndChannel, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_REJECT_FRIEND_SOCKET, payload: data });
    }
  } catch (error) {
    console.log("error resAcceptFriend", error);
  }
}

//ROOM
/**
 * creat room chat if click list contact
 * @param {*} socket
 * @param {*} action
 */
function* creatRomChat(socket, action) {
  try {
    yield put({ type: FETCHING_CREAT_ROM_CHAT });
    let res = yield call(roomApi.creatRoom, action.payload);
    yield apply(socket, socket.emit, ["CREAT_ROOM_CHAT", res.data]);
  } catch (error) {
    console.log("error creatRomChat", error);
    yield put({ type: CREAT_ROOM_CHAT_ERROR, payload: error.response });
  }
}

function* resCreatChatRoom(socket) {
  try {
    const chanel = yield call(creatRoomSocket, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: CREAT_ROOM_CHAT_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log("error resCreatChatRoom", error);
  }
}

function* joinRoom(socket, action) {
  yield apply(socket, socket.emit, ["JOIN_ROOM_CHAT", action.payload]);
  yield put({
    type: UPDATED_ROOM_COUNT_UNREAD_MESSAGE,
    payload: { roomId: action.payload.chatRoomId, type: "DEFAULT" },
  });
}

function* addMemberGroupChat(socket, action) {
  try {
    let res = yield call(groupApi.addContactToGroup, action.payload);

    yield put({ type: RES_ADD_MEMBER_GROUP_AXIOS_SUCCESS, payload: res.data });
    yield apply(socket, socket.emit, ["ADD_MEMBER_TO_GROUP", res.data]);
  } catch (error) {
    console.log("error addMemberGroupChat", error);
  }
}

function* resUpdatedMemberToGroup(socket) {
  try {
    const chanel = yield call(addMemberToGroup, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: ADD_MEMBER_GROUP_CHAT_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log("error resAcceptFriend", error);
  }
}

// message
function* sentMessageText(socket, action) {
  try {
    let project = yield select(getProject);
    const data = { ...action.payload, userId: project.user._id };
    let messageCreat = yield call(messageApi.sentMessage, data);
    yield apply(socket, socket.emit, ["SENT_MESSAGE", messageCreat.data]);
  } catch (error) {
    console.log("error sentMessageText", error);
  }
}

function* sentMessageFile(socket, action) {
  try {
    let messageCreat = yield call(messageApi.sentMessageFile, action.payload);
    yield apply(socket, socket.emit, ["SENT_MESSAGE", messageCreat.data]);
  } catch (error) {
    console.log("error sentMessageFile", error);
  }
}

function* sentMessageLike(socket, action) {
  try {
    let messageCreat = yield call(messageApi.sentMessageLike, action.payload);
    yield apply(socket, socket.emit, ["SENT_MESSAGE", messageCreat.data]);
  } catch (error) {
    console.log("error sentMessageLike", error);
  }
}

function* sentMessageFileForward(socket, action) {
  try {
    let messageCreat = yield call(messageApi.sentMessageFileForward, action.payload);
    yield apply(socket, socket.emit, ["SENT_MESSAGE", messageCreat.data]);
  } catch (error) {
    console.log("error sentMessageFile", error);
  }
}

function* resSentMessage(socket) {
  try {
    const chanel = yield call(listMessageSocket, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_SENT_MESSAGE_SOCKET_SUCCCESS, payload: data });
      yield put({ type: UPDATED_ROOM_LAST_MESSAGE, payload: data });
    }
  } catch (error) {
    console.log("error resSentMessage", error);
  }
}

function* removeMessage(socket, action) {
  try {
    let messageRemove = yield call(messageApi.removeMessage, action.payload);
    yield apply(socket, socket.emit, ["REMOVE_MESSAGE", messageRemove.data]);
  } catch (error) {
    console.log("error removeMessage", error);
  }
}

function* resRemoveMessage(socket) {
  try {
    const chanel = yield call(removeMessageSocket, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_REMOVE_MESSAGE_SOCKET_SUCCESS, payload: data });
      yield put({ type: UPDATED_ROOM_LAST_MESSAGE, payload: data.lastedMessage });
    }
  } catch (error) {
    console.log("error resRemoveMessage", error);
  }
}

function* resNotifSentMessage(socket) {
  try {
    const chanel = yield call(notifSentMessage, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: UPDATED_ROOM_LAST_MESSAGE, payload: data.message });
      yield put({
        type: UPDATED_ROOM_COUNT_UNREAD_MESSAGE,
        payload: { roomId: data.roomId, type: "UP" },
      });
    }
  } catch (error) {
    console.log("error resNotifSentMessage", error);
  }
}

//CALL
function* callUser(socket, action) {
  yield apply(socket, socket.emit, ["REQ_CALL_USER", action.payload]);
}

function* resCallUser(socket) {
  try {
    const chanel = yield call(callUserChannel, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_CALL_USER, payload: data });
    }
  } catch (error) {
    console.log("error resCallUser", error);
  }
}

function* acceptVideoCall(socket, action) {
  yield apply(socket, socket.emit, ["REQ_ACCEPT_CALL_USER", action.payload]);
}

function* resAcceptVideoCall(socket) {
  try {
    const chanel = yield call(callAcceptChannel, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: REQ_ACCEPT_VIDEO_CALL_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log("error resAcceptVideoCall", error);
  }
}

function* cancelVideoCall(socket, action) {
  yield put({ type: RES_CANCEL_VIDEO_CALL_SUCCESS });
}

function* rejectCall(socket, action) {
  yield apply(socket, socket.emit, ["REQ_REJECT_CALL", action.payload]);
}

function* resRejectCall(socket) {
  try {
    const chanel = yield call(rejectCallSocket, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_REJECT_CALL_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log("error resRejectCall", error);
  }
}

function* groupStartCall(socket, action) {
  yield apply(socket, socket.emit, ["REQ_GROUP_START_CALL", action.payload]);
}

function* joinRoomCall(socket, action) {
  console.log("------------------->>>>>>>>>>>", action.payload);
  yield apply(socket, socket.emit, ["REQ_JOIN_ROOM_CALL", action.payload]);
}
//
function* resStartGroupCall(socket) {
  try {
    const chanel = yield call(startGroupCall, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_GROUP_START_CALL, payload: data });
    }
  } catch (error) {
    console.log("error resStartGroupCall", error);
  }
}

function* resAllUserGroupCall(socket) {
  try {
    const chanel = yield call(allUserGroupCall, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_ALL_USER_GROUP_CALL, payload: data });
    }
  } catch (error) {
    console.log("error resStartGroupCall", error);
  }
}

function* sendingSignalGroup(socket, action) {
  yield apply(socket, socket.emit, ["REQ_SENDING_SIGNAL_GROUP_CALL", action.payload]);
}

function* resUserJoinGroupSignal(socket) {
  try {
    const chanel = yield call(userJoinGroupSignal, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_USER_JOINED_GROUP_CALL, payload: data });
    }
  } catch (error) {
    console.log("error resUserJoinGroupSignal", error);
  }
}

function* returnSignalGroup(socket, action) {
  yield apply(socket, socket.emit, ["REQ_RETURNING_SIGNAL_GROUP_CALL", action.payload]);
}

function* resReceivingReturnedGroupSignal(socket) {
  try {
    const chanel = yield call(receivingGroupSignal, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_RECEIVING_RETURNED_SIGNAL_GROUP_CALL, payload: data });
    }
  } catch (error) {
    console.log("error resReceivingReturnedGroupSignal", error);
  }
}

function* cancelSignalGroup(socket, action) {
  yield apply(socket, socket.emit, ["REQ_CANCEL_SIGNAL_GROUP_CALL", action.payload]);
}

function* resCancelSignalGroupCall(socket) {
  try {
    const chanel = yield call(receivingCancelGroupSignal, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_CANCEL_SIGNAL_GROUP_CALL, payload: data });
    }
  } catch (error) {
    console.log("error resCancelSignalGroupCall", error);
  }
}
//reaction
function* sentReaction(socket, action) {
  try {
    let reactionCreated = yield call(messageApi.sentReaction, action.payload);
    yield apply(socket, socket.emit, ["SENT_REACTION_CREATED", reactionCreated.data]);
  } catch (error) {
    console.log("error sentReaction:", error);
  }
}

// RES_SENT_REACTION_CREATED
function* resSentReaction(socket) {
  try {
    const chanel = yield call(reactionFromSocket, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_SENT_REACTION_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log("error resSentReaction:", error);
  }
}

//settting
function* changeNameGroup(socket, action) {
  try {
    let changeNameSuccess = yield call(groupApi.changeNameGroup, action.payload);
    yield apply(socket, socket.emit, ["CHANGE_NAME_GROUP", changeNameSuccess.data]);
  } catch (error) {
    console.log("changeNameGroup error:", error);
  }
}

function* resChangeNameGroup(socket) {
  try {
    const chanel = yield call(changeNameGroupSocket, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_CHANGE_NAME_GROUP_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log("error resCancelSignalGroupCall", error);
  }
}

function* changeAvatarGroup(socket, action) {
  try {
    let changeAvatarSuccess = yield call(groupApi.changeAvatarGroup, action.payload);
    yield apply(socket, socket.emit, ["CHANGE_AVATAR_GROUP", changeAvatarSuccess.data]);
  } catch (error) {
    console.log("changeNameGroup error:", error);
  }
}

function* resChangeAvatarGroup(socket) {
  try {
    const chanel = yield call(changeAvatarGroupSocket, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_CHANGE_AVATAR_GROUP_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log("error resChangeAvatarGroup", error);
  }
}

function* leaveGroup(socket, action) {
  try {
    let leaveGroupSuccess = yield call(groupApi.leaveGroup, action.payload);
    //put action remove group chat because you leave
    yield put({ type: RES_LEAVE_GROUP_AXIOS_SUCCESS, payload: leaveGroupSuccess.data });
    yield apply(socket, socket.emit, ["LEAVE_GROUP", leaveGroupSuccess.data]);
  } catch (error) {
    console.log("leaveGroup error:", error);
  }
}

function* resLeaveGroup(socket) {
  try {
    const chanel = yield call(leaveGroupSocket, socket);
    while (true) {
      const data = yield take(chanel);
      yield put({ type: RES_LEAVE_GROUP_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log("error resLeaveGroup", error);
  }
}

function test() {
  console.log("______________________________________");
}

export default function* socketWatcher() {
  yield take(CONNECT_SOCKET);
  const socket = yield call(connect);
  if (socket) {
    //---------------------------------------read-------------------------
    console.log("socket run ok ***");
    yield fork(getListUserOnline, socket);
    yield fork(getListUserOffline, socket);
    yield fork(requestAddFriend, socket);
    yield fork(resAcceptFriend, socket);
    yield fork(resRejectFriend, socket);
    yield fork(resCreatChatRoom, socket);
    yield fork(resUpdatedMemberToGroup, socket);
    //diract call
    yield fork(resCallUser, socket);
    yield fork(resAcceptVideoCall, socket);
    yield fork(resCancelSignalGroupCall, socket);
    yield fork(resRejectCall, socket);
    //message
    yield fork(resSentMessage, socket);
    yield fork(resRemoveMessage, socket);
    yield fork(resNotifSentMessage, socket);
    //group call
    yield fork(resStartGroupCall, socket);
    yield fork(resAllUserGroupCall, socket);
    yield fork(resUserJoinGroupSignal, socket);
    yield fork(resReceivingReturnedGroupSignal, socket);
    //reaction
    yield fork(resSentReaction, socket);
    //setting
    yield fork(resChangeNameGroup, socket);
    yield fork(resChangeAvatarGroup, socket);
    yield fork(resLeaveGroup, socket);

    //------------------------------------write-------------------------
    //friend
    yield takeLatest(REQ_REJECT_FRIEND_SOCKET, reqRejectFriend, socket);
    yield takeLatest(REQ_ADDFRIEND_SOCKET, resAddFriend, socket);
    yield takeLatest(REQ_ACCEPT_FRIEND_SOCKET, reqAcceptFriend, socket);
    //room
    yield takeLatest(CREAT_ROM_CHAT, creatRomChat, socket);
    yield takeLatest(JOIN_ROOM_CHAT, joinRoom, socket);
    yield takeLatest(ADD_MEMBER_GROUP_CHAT, addMemberGroupChat, socket);
    //message
    yield takeLatest(REQ_SENT_MESSAGE_TEXT_SOCKET, sentMessageText, socket);
    yield takeLatest(REQ_SENT_MESSAGE_FILE_SOCKET, sentMessageFile, socket);
    yield takeLatest(REQ_SENT_MESSAGE_LIKE_SOCKET, sentMessageLike, socket);
    yield takeLatest(REQ_SENT_MESSAGE_FILE_FORWARD_SOCKET, sentMessageFileForward, socket);
    yield takeLatest(REQ_REMOVE_MESSAGE_SOCKET, removeMessage, socket);
    //call
    yield takeLatest(REQ_CALL_USER, callUser, socket);
    yield takeLatest(REQ_CANCEL_VIDEO_CALL, cancelVideoCall, socket);
    yield takeLatest(REQ_ACCEPT_VIDEO_CALL, acceptVideoCall, socket);
    yield takeLatest(REQ_REJECT_CALL, rejectCall, socket);
    // call group
    yield takeLatest(REQ_GROUP_START_CALL, groupStartCall, socket);
    yield takeLatest(REQ_JOIN_ROOM_CALL, joinRoomCall, socket);
    yield takeLatest(REQ_SENDING_SIGNAL_GROUP_CALL, sendingSignalGroup, socket);
    yield takeLatest(REQ_RETURN_SIGNAL_GROUP_CALL, returnSignalGroup, socket);
    yield takeLatest(REQ_CANCEL_SIGNAL_GROUP_CALL, cancelSignalGroup, socket);
    //reaction
    yield takeLatest(REQ_SENT_REACTION, sentReaction, socket);
    //setting
    yield takeLatest(REQ_CHANGE_NAME_GROUP, changeNameGroup, socket);
    yield takeLatest(REQ_CHANGE_AVATAR_GROUP, changeAvatarGroup, socket);
    yield takeLatest(REQ_LEAVE_GROUP, leaveGroup, socket);
    yield takeLatest("TEST", test);
  }
}
