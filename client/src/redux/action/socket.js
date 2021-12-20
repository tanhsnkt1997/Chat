export const CONNECT_SOCKET = "CONNECT_SOCKET";
export const REQ_ADDFRIEND_SOCKET = "REQ_ADDFRIEND_SOCKET";
export const RES_ADDFRIEND_SOCKET = "RES_ADDFRIEND_SOCKET";
export const REQ_ACCEPT_FRIEND_SOCKET = "REQ_ACCEPT_FRIEND_SOCKET";
export const REQ_ACCEPT_FRIEND_SOCKET_SUCCESS = "REQ_ACCEPT_FRIEND_SOCKET_SUCCESS";
export const RES_ACCEPT_FRIEND_SOCKET = "RES_ACCEPT_FRIEND_SOCKET";
export const REQ_REJECT_FRIEND_SOCKET = "REQ_REJECT_FRIEND_SOCKET";
export const REQ_REJECT_FRIEND_SOCKET_SUCCESS = "REQ_REJECT_FRIEND_SOCKET_SUCCESS";
export const RES_REJECT_FRIEND_SOCKET = "RES_REJECT_FRIEND_SOCKET";
//ROOM
export const CREAT_ROM_CHAT = "CREAT_ROM_CHAT";
export const FETCHING_CREAT_ROM_CHAT = "FETCHING_CREAT_ROM_CHAT";
export const JOIN_ROOM_CHAT = "JOIN_ROOM_CHAT";
export const CREAT_ROOM_CHAT_SUCCESS = "CREAT_ROOM_CHAT_SUCCESS";
export const CREAT_ROOM_CHAT_ERROR = "CREAT_ROOM_CHAT_ERROR";
export const UPDATED_ROOM_LAST_MESSAGE = "UPDATED_ROOM_LAST_MESSAGE";
export const UPDATED_ROOM_COUNT_UNREAD_MESSAGE = "UPDATED_ROOM_COUNT_UNREAD_MESSAGE";
//SENT_MESSAGE
export const REQ_SENT_MESSAGE_TEXT_SOCKET = "REQ_SENT_MESSAGE_TEXT_SOCKET";
export const REQ_SENT_MESSAGE_FILE_SOCKET = "REQ_SENT_MESSAGE_FILE_SOCKET";
export const REQ_SENT_MESSAGE_LIKE_SOCKET = "REQ_SENT_MESSAGE_LIKE_SOCKET";
export const RES_SENT_MESSAGE_SOCKET_SUCCCESS = "RES_SENT_MESSAGE_SOCKET_SUCCCESS";
export const REQ_SENT_MESSAGE_FILE_FORWARD_SOCKET = "REQ_SENT_MESSAGE_FILE_FORWARD_SOCKET";
export const REQ_REMOVE_MESSAGE_SOCKET = "REQ_REMOVE_MESSAGE_SOCKET";
export const RES_REMOVE_MESSAGE_SOCKET_SUCCESS = "RES_REMOVE_MESSAGE_SOCKET_SUCCESS";
//CALL ONE_ONE
export const REQ_CALL_USER = "REQ_CALL_USER";
export const RES_CALL_USER = "RES_CALL_USER";
export const REQ_VIDEO_CALL = "REQ_VIDEO_CALL";
export const REQ_CANCEL_VIDEO_CALL = "REQ_CANCEL_VIDEO_CALL";
export const RES_CANCEL_VIDEO_CALL_SUCCESS = "RES_CANCEL_VIDEO_CALL_SUCCESS";
export const REQ_REJECT_CALL = "REQ_REJECT_CALL";
export const RES_REJECT_CALL_SUCCESS = "RES_REJECT_CALL_SUCCESS";
export const REQ_ACCEPT_VIDEO_CALL = "REQ_ACCEPT_VIDEO_CALL";
export const REQ_ACCEPT_VIDEO_CALL_SUCCESS = "REQ_ACCEPT_VIDEO_CALL_SUCCESS";
// CALL GROUP
export const REQ_GROUP_START_CALL = "REQ_GROUP_START_CALL";
export const RES_GROUP_START_CALL = "RES_GROUP_START_CALL";
export const REQ_JOIN_ROOM_CALL = "REQ_JOIN_ROOM_CALL";
export const RES_ALL_USER_GROUP_CALL = "RES_ALL_USER_GROUP_CALL";
export const REQ_SENDING_SIGNAL_GROUP_CALL = "REQ_SENDING_SIGNAL_GROUP_CALL";
export const RES_USER_JOINED_GROUP_CALL = "RES_USER_JOINED_GROUP_CALL";
export const REQ_RETURN_SIGNAL_GROUP_CALL = "REQ_RETURN_SIGNAL_GROUP_CALL";
export const RES_RECEIVING_RETURNED_SIGNAL_GROUP_CALL = "RES_RECEIVING_RETURNED_SIGNAL_GROUP_CALL";
export const REQ_CANCEL_SIGNAL_GROUP_CALL = "REQ_CANCEL_SIGNAL_GROUP_CALL";
export const RES_CANCEL_SIGNAL_GROUP_CALL = "RES_CANCEL_SIGNAL_GROUP_CALL";
//ONLINE_OFFLINE
export const RES_USER_ONLINE = "RES_USER_ONLINE";
export const RES_USER_OFFLINE = "RES_USER_OFFLINE";
//REACTION
export const REQ_SENT_REACTION = "REQ_SENT_REACTION";
export const RES_SENT_REACTION_SUCCESS = "RES_SENT_REACTION_SUCCESS";
//setting
export const REQ_CHANGE_NAME_GROUP = "REQ_CHANGE_NAME_GROUP";
export const RES_CHANGE_NAME_GROUP_SUCCESS = "RES_CHANGE_NAME_GROUP_SUCCESS";
export const REQ_CHANGE_AVATAR_GROUP = "REQ_CHANGE_AVATAR_GROUP";
export const RES_CHANGE_AVATAR_GROUP_SUCCESS = "RES_CHANGE_AVATAR_GROUP_SUCCESS";
export const REQ_LEAVE_GROUP = "REQ_LEAVE_GROUP";
export const RES_LEAVE_GROUP_AXIOS_SUCCESS = "RES_LEAVE_GROUP_AXIOS_SUCCESS";
export const RES_LEAVE_GROUP_SUCCESS = "RES_LEAVE_GROUP_SUCCESS";
export const ADD_MEMBER_GROUP_CHAT = "ADD_MEMBER_GROUP_CHAT";
export const RES_ADD_MEMBER_GROUP_AXIOS_SUCCESS = "RES_ADD_MEMBER_GROUP_AXIOS_SUCCESS";
export const ADD_MEMBER_GROUP_CHAT_SUCCESS = "ADD_MEMBER_GROUP_CHAT_SUCCESS";

const socketAction = {
  connectSocket() {
    return { type: CONNECT_SOCKET };
  },

  reqAddFriendSocket(payload) {
    return { type: REQ_ADDFRIEND_SOCKET, payload };
  },

  reqAcceptFriend(payload) {
    console.log("action nhan dc", payload);
    return { type: REQ_ACCEPT_FRIEND_SOCKET, payload };
  },

  reqRejectFriend(payload) {
    return { type: REQ_REJECT_FRIEND_SOCKET, payload };
  },
  //Room
  creatRomChat(payload) {
    return { type: CREAT_ROM_CHAT, payload };
  },
  joinRoom(payload) {
    return { type: JOIN_ROOM_CHAT, payload };
  },
  addMemberToGroup(payload) {
    return { type: ADD_MEMBER_GROUP_CHAT, payload };
  },
  //Message
  sentMessge(payload) {
    return { type: REQ_SENT_MESSAGE_TEXT_SOCKET, payload };
  },
  sentMessageFile(payload) {
    return { type: REQ_SENT_MESSAGE_FILE_SOCKET, payload };
  },
  sentMessageLike(payload) {
    return { type: REQ_SENT_MESSAGE_LIKE_SOCKET, payload };
  },
  sentMessageFileForward(payload) {
    return { type: REQ_SENT_MESSAGE_FILE_FORWARD_SOCKET, payload };
  },
  removeMessageAction(payload) {
    return { type: REQ_REMOVE_MESSAGE_SOCKET, payload };
  },
  //videocall
  callUser(payload) {
    return { type: REQ_CALL_USER, payload };
  },
  acceptVideoCall(payload) {
    return { type: REQ_ACCEPT_VIDEO_CALL, payload };
  },
  cancelCall(payload) {
    return { type: REQ_CANCEL_VIDEO_CALL, payload };
  },
  rejectCall(payload) {
    return { type: REQ_REJECT_CALL, payload };
  },
  videoCall(payload) {
    return { type: REQ_VIDEO_CALL, payload };
  },
  // video call group
  groupStartCall(payload) {
    return { type: REQ_GROUP_START_CALL, payload };
  },

  joinRoomCall(payload) {
    console.log("vao action join room call", payload);
    return { type: REQ_JOIN_ROOM_CALL, payload };
  },
  sendingSignalGroupCall(payload) {
    return { type: REQ_SENDING_SIGNAL_GROUP_CALL, payload };
  },
  returnSignalGroupCall(payload) {
    return { type: REQ_RETURN_SIGNAL_GROUP_CALL, payload };
  },
  cancelSignalGroupCall(payload) {
    return { type: REQ_CANCEL_SIGNAL_GROUP_CALL, payload };
  },
  //reaction
  sentReaction(payload) {
    return { type: REQ_SENT_REACTION, payload };
  },
  //setting
  changeNameGroup(payload) {
    return { type: REQ_CHANGE_NAME_GROUP, payload };
  },
  changeAvatar(payload) {
    return { type: REQ_CHANGE_AVATAR_GROUP, payload };
  },
  leaveGroup(payload) {
    return { type: REQ_LEAVE_GROUP, payload };
  },
  test() {
    console.log("vao action teeeeee");
    return { type: "TEST" };
  },
};

export default socketAction;
