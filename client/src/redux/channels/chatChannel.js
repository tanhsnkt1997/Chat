import { eventChannel, END } from "redux-saga";
import { RES_ADDFRIEND_SOCKET } from "../action/socket";

//elem.scrollIntoView({ behavior: 'smooth' });

export function creatConnectChannel(socket) {
  return eventChannel((emitter) => {
    const connectHandler = (event) => {
      emitter({ type: "connect" });
    };
    const disconnectHandler = (event) => {
      emitter({ type: "disconnect" });
    };

    const errorHandler = (errorEvent) => {
      emitter(new Error(errorEvent.reason));
    };

    socket.on("connect", connectHandler);
    socket.on("disconnect", disconnectHandler);
    socket.on("error", errorHandler);

    const unsubscribe = () => {
      //   socket.off("connect", connectHandler);
      //   socket.off("disconnect", disconnectHandler);
      //   emitter(END);
    };
    return unsubscribe;
  });
}

export function userOnline(socket) {
  return eventChannel((emitter) => {
    const getListUserOnline = (event) => {
      emitter(event);
    };
    socket.on("RES_USER_ONLINE", getListUserOnline);
    return () => {
      socket.off("RES_USER_ONLINE", getListUserOnline);
    };
  });
}

export function userOffline(socket) {
  return eventChannel((emitter) => {
    const getListUserOffline = (event) => {
      emitter(event);
    };
    socket.on("RES_USER_OFFLINE", getListUserOffline);
    return () => {
      socket.off("RES_USER_OFFLINE", getListUserOffline);
    };
  });
}

export function addFrienndChannel(socket) {
  return eventChannel((emitter) => {
    const reqAddFriendHandle = (event) => {
      emitter(event);
    };
    socket.on("res-add-friend", reqAddFriendHandle);
    return () => {
      socket.off("res-add-friend", reqAddFriendHandle);
    };
  });
}

export function acceptFrienndChannel(socket) {
  return eventChannel((emitter) => {
    const acceptFrienndChannel = (event) => {
      emitter(event);
    };
    socket.on("res-accept-friend", acceptFrienndChannel);
    return () => {
      socket.off("res-accept-friend", acceptFrienndChannel);
    };
  });
}

export function rejecttFrienndChannel(socket) {
  return eventChannel((emitter) => {
    const rejectFrienndChannel = (event) => {
      emitter(event);
    };
    socket.on("res-reject-friend", rejectFrienndChannel);
    return () => {
      socket.off("res-reject-friend", rejectFrienndChannel);
    };
  });
}
//room
export function creatRoomSocket(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_CREAT_ROOM_CHAT", res);
    return () => {
      socket.off("RES_CREAT_ROOM_CHAT", res);
    };
  });
}

export function addMemberToGroup(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_ADD_MEMBER_TO_GROUP", res);
    return () => {
      socket.off("RES_ADD_MEMBER_TO_GROUP", res);
    };
  });
}

//message
export function listMessageSocket(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_SENT_MESSAGE", res);
    return () => {
      socket.off("RES_SENT_MESSAGE", res);
    };
  });
}

export function removeMessageSocket(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_REMOVE_MESSAGE", res);
    return () => {
      socket.off("RES_REMOVE_MESSAGE", res);
    };
  });
}

export function notifSentMessage(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_NOTIF_SENT_MESSAGE", res);
    return () => {
      socket.off("RES_NOTIF_SENT_MESSAGE", res);
    };
  });
}

//call
export function callUserChannel(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_CALL_USER", res);
    return () => {
      socket.off("RES_CALL_USER", res);
    };
  });
}

export function callAcceptChannel(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_CALL_ACCEPTED", res);
    return () => {
      socket.off("RES_CALL_ACCEPTED", res);
    };
  });
}

// group call
export function startGroupCall(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_START_GROUP_CALL", res);
    return () => {
      socket.off("RES_START_GROUP_CALL", res);
    };
  });
}

export function allUserGroupCall(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_ALL_USER_GROUP_CALL", res);
    return () => {
      socket.off("RES_ALL_USER_GROUP_CALL", res);
    };
  });
}

export function userJoinGroupSignal(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_USER_JOINED_GROUP_CALL", res);
    return () => {
      socket.off("RES_USER_JOINED_GROUP_CALL", res);
    };
  });
}

export function receivingGroupSignal(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_RECEIVING_RETURNED_SIGNAL_GROUP_CALL", res);
    return () => {
      socket.off("RES_RECEIVING_RETURNED_SIGNAL_GROUP_CALL", res);
    };
  });
}

export function receivingCancelGroupSignal(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_CANCEL_SIGNAL_GROUP_CALL", res);
    return () => {
      socket.off("RES_CANCEL_SIGNAL_GROUP_CALL", res);
    };
  });
}

export function reactionFromSocket(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_SENT_REACTION_CREATED", res);
    return () => {
      socket.off("RES_SENT_REACTION_CREATED", res);
    };
  });
}

export function changeNameGroupSocket(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_CHANGE_NAME_GROUP", res);
    return () => {
      socket.off("RES_CHANGE_NAME_GROUP", res);
    };
  });
}

export function changeAvatarGroupSocket(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_CHANGE_AVATAR_GROUP", res);
    return () => {
      socket.off("RES_CHANGE_AVATAR_GROUP", res);
    };
  });
}

export function leaveGroupSocket(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_LEAVE_GROUP", res);
    return () => {
      socket.off("RES_LEAVE_GROUP", res);
    };
  });
}

export function rejectCallSocket(socket) {
  return eventChannel((emitter) => {
    const res = (event) => {
      emitter(event);
    };
    socket.on("RES_REJECT_CALL", res);
    return () => {
      socket.off("RES_REJECT_CALL", res);
    };
  });
}
