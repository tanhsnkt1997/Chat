import {
  GET_LIST_ROOM_CHAT_SUCCESS,
  SET_CURRENT_ROOM_SUCCESS,
  GET_LIST_IMG_ROOM_SUCCESS,
  GET_LIST_VIDEO_AUDIO_ROOM_SUCCESS,
  GET_LIST_DOC_ROOM_SUCCESS,
  //search
  LOADING_SEARCH_ROOM,
  IS_SEARCHING,
  GET_LIST_ROOM_SEARCH_SUCCESS,
  GET_LIST_ROOM_SEARCH_FORWARD_SUCCESS,
  GET_LIST_ROOM_SEARCH_MORE_SUCCESS,
  //
  GET_ALL_MULTIMEDIA_SUCCESS,
} from "../action/room";

import {
  UPDATED_ROOM_LAST_MESSAGE,
  UPDATED_ROOM_COUNT_UNREAD_MESSAGE,
  FETCHING_CREAT_ROM_CHAT,
  CREAT_ROOM_CHAT_SUCCESS,
  CREAT_ROOM_CHAT_ERROR,
  //direct call
  RES_CALL_USER,
  RES_CANCEL_VIDEO_CALL_SUCCESS,
  REQ_ACCEPT_VIDEO_CALL_SUCCESS,
  RES_REJECT_CALL_SUCCESS,
  //group chat
  RES_GROUP_START_CALL,
  RES_ALL_USER_GROUP_CALL,
  RES_USER_JOINED_GROUP_CALL,
  RES_RECEIVING_RETURNED_SIGNAL_GROUP_CALL,
  RES_CANCEL_SIGNAL_GROUP_CALL,
  //setting
  RES_CHANGE_NAME_GROUP_SUCCESS,
  RES_CHANGE_AVATAR_GROUP_SUCCESS,
  RES_LEAVE_GROUP_AXIOS_SUCCESS,
  RES_LEAVE_GROUP_SUCCESS,
  ADD_MEMBER_GROUP_CHAT_SUCCESS,
  RES_ADD_MEMBER_GROUP_AXIOS_SUCCESS,
} from "../action/socket";
// const reservation_prop = Object.assign({}, this.state, free_room)

const initialState = {
  listRoom: {
    total: 0,
    data: [],
  },
  query: "",
  listRoomSearch: {
    loading: false,
    total: 0,
    data: [],
  },
  listRoomSearchForward: {
    loading: false,
    total: 0,
    data: [],
  },
  currentRoom: null,
  allMedia: [],
  // file in room
  listImageRoom: [],
  listVideoAudio: [],
  listDoc: [],
  //call
  call: {},
  acceptCall: {},
  allUserGroupCall: [],
  userJoinedSignal: {},
  recevingReturnedSignal: {},
  userLeaveGroupCall: {},
  // fetching
  isFetchingCreatRoom: false,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_CREAT_ROM_CHAT:
      return { ...state, isFetchingCreatRoom: true };
    case CREAT_ROOM_CHAT_ERROR:
      //room chat is exits
      return {
        ...state,
        currentRoom:
          action.payload.status === 409 ? action.payload.data.roomExits : state.currentRoom,
        isFetchingCreatRoom: false,
      };
    case CREAT_ROOM_CHAT_SUCCESS:
      //isFetchingCreatRoom chua xu ly xong
      return { ...state, isFetchingCreatRoom: false, currentRoom: action.payload.data };
    case SET_CURRENT_ROOM_SUCCESS:
      return { ...state, currentRoom: action.payload };
    case GET_LIST_ROOM_CHAT_SUCCESS:
      return {
        ...state,
        listRoom: {
          total: action.payload.totalCount,
          data: [...state.listRoom.data, ...action.payload.data],
        },
      };

    case UPDATED_ROOM_LAST_MESSAGE:
      const updateLastMessageAndFilter = state.listRoom.data.reduce((acc, curr, index, array) => {
        if (curr._id === action.payload.chatRoom) {
          acc.unshift({ ...curr, lastMessage: action.payload });
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);

      return {
        ...state,
        listRoom: { ...state.listRoom, data: updateLastMessageAndFilter },
      };

    case UPDATED_ROOM_COUNT_UNREAD_MESSAGE:
      return {
        ...state,
        listRoom: {
          ...state.listRoom,
          data: state.listRoom.data.map((room) =>
            room._id === action.payload.roomId
              ? {
                  ...room,
                  unreadMessage: action.payload.type === "DEFAULT" ? 0 : ++room.unreadMessage,
                }
              : room
          ),
        },
      };

    case GET_LIST_IMG_ROOM_SUCCESS:
      return { ...state, listImageRoom: action.payload };
    case GET_LIST_VIDEO_AUDIO_ROOM_SUCCESS:
      return { ...state, listVideoAudio: action.payload };
    case GET_LIST_DOC_ROOM_SUCCESS:
      return { ...state, listDoc: action.payload };
    //chat
    case RES_CALL_USER:
      return { ...state, call: action.payload };
    case REQ_ACCEPT_VIDEO_CALL_SUCCESS:
      return { ...state, acceptCall: action.payload };
    case RES_CANCEL_VIDEO_CALL_SUCCESS:
      return {
        ...state,
        call: {},
        acceptCall: {},
        allUserGroupCall: [],
        userJoinedSignal: {},
        recevingReturnedSignal: {},
        userLeaveGroupCall: {},
      };
    case RES_REJECT_CALL_SUCCESS:
      return { ...state };
    //group chat
    case RES_GROUP_START_CALL:
      return { ...state, call: action.payload };
    case RES_ALL_USER_GROUP_CALL:
      return { ...state, allUserGroupCall: action.payload };
    case RES_USER_JOINED_GROUP_CALL:
      return { ...state, userJoinedSignal: action.payload };
    case RES_RECEIVING_RETURNED_SIGNAL_GROUP_CALL:
      return { ...state, recevingReturnedSignal: action.payload };
    case RES_CANCEL_SIGNAL_GROUP_CALL:
      return { ...state, userLeaveGroupCall: action.payload };
    //search
    case LOADING_SEARCH_ROOM:
      return { ...state, listRoomSearch: { ...state.listRoomSearch, loading: true } };
    case IS_SEARCHING:
      return {
        ...state,
        query: action.payload.text,
      };
    case GET_LIST_ROOM_SEARCH_SUCCESS:
      return {
        ...state,
        listRoomSearch: {
          total: action.payload.totalCount,
          data: action.payload.data,
          loading: false,
        },
      };
    case GET_LIST_ROOM_SEARCH_FORWARD_SUCCESS:
      return {
        ...state,
        listRoomSearchForward: {
          total: action.payload.totalCount,
          data: action.payload.data,
        },
      };

    case GET_LIST_ROOM_SEARCH_MORE_SUCCESS:
      return {
        ...state,
        listRoomSearch: {
          total: action.payload.totalCount,
          data: [...state.listRoomSearch.data, ...action.payload.data],
        },
      };
    // setting
    case RES_CHANGE_NAME_GROUP_SUCCESS:
      return {
        ...state,
        currentRoom: { ...state.currentRoom, name: action.payload.name },
        listRoom: {
          ...state.listRoom,
          data: state.listRoom.data.map((group) =>
            group._id === action.payload.roomId ? { ...group, name: action.payload.name } : group
          ),
        },
      };
    case RES_CHANGE_AVATAR_GROUP_SUCCESS:
      return {
        ...state,
        currentRoom: { ...state.currentRoom, chatIcon: action.payload.avatar },
        listRoom: {
          ...state.listRoom,
          data: state.listRoom.data.map((group) =>
            group._id === action.payload.roomId
              ? { ...group, chatIcon: action.payload.avatar }
              : group
          ),
        },
      };
    case RES_LEAVE_GROUP_AXIOS_SUCCESS:
      return {
        ...state,
        listRoom: {
          total: state.total - 1,
          data: state.listRoom.data.filter((group) => group._id !== action.payload.groupId),
        },
        listRoomSearch: {
          total: state.total - 1,
          data: state.listRoomSearch.data.filter((group) => group._id !== action.payload.groupId),
        },
        currentRoom: null,
      };

    case RES_LEAVE_GROUP_SUCCESS:
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          members: state.currentRoom.members.filter(
            (member) => member._id !== action.payload.userId
          ),
        },
      };
    // check lai neu add thanh cong member moi add phai add new list room vua dc add, k can thiet set current room.
    case ADD_MEMBER_GROUP_CHAT_SUCCESS:
      //if room don't Exits => member new invite
      const isRoomExits =
        state.listRoom.data.findIndex((room) => room._id === action.payload.roomUpdate._id) !== -1;
      return {
        ...state,
        //if don't get list member first load ===> remove
        currentRoom: isRoomExits
          ? { ...state.currentRoom, members: action.payload.roomUpdate.members }
          : state.currentRoom, //cho nay k can thiet
        //update list room with new member
        listRoom: {
          ...state.listRoom,
          data: isRoomExits
            ? state.listRoom.data.map((room) =>
                room._id === action.payload.roomUpdate._id
                  ? {
                      ...room,
                      members: action.payload.roomUpdate.members,
                    }
                  : room
              )
            : [action.payload.roomUpdate, ...state.listRoom.data],
        },
      };

    case GET_ALL_MULTIMEDIA_SUCCESS:
      return { ...state, allMedia: action.payload.allMedia };

    default:
      return state;
  }
};

export default roomReducer;
