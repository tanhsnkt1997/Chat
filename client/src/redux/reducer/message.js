import {
  GET_LIST_MESSAGE_SUCCESS,
  CLEAR_MESSAGE_SUCCESS,
  GET_LIST_SEARCH_MESSAGE_SUCCESS,
  SET_INDEX_SEARCH_MESSAGE_SUCCESS,
  FIND_LIST_MESSAGE_SEARCH_SUCCESS,
  RESET_SEARCH_MESSAGE_SUCCESS,
  SET_MESSAGE_REPLY_SUCCESS,
} from "../action/message";
import {
  RES_SENT_MESSAGE_SOCKET_SUCCCESS,
  RES_REMOVE_MESSAGE_SOCKET_SUCCESS,
  ADD_MESSAGE_NOTIFICATION_ROOM,
  RES_SENT_REACTION_SUCCESS,
  RES_CHANGE_NAME_GROUP_SUCCESS,
  RES_CHANGE_AVATAR_GROUP_SUCCESS,
  //setting
  ADD_MEMBER_GROUP_CHAT_SUCCESS,
  RES_LEAVE_GROUP_AXIOS_SUCCESS,
  RES_LEAVE_GROUP_SUCCESS,
} from "../action/socket";
import { SET_CURRENT_ROOM_SUCCESS } from "../action/room";
// const reservation_prop = Object.assign({}, this.state, free_room)

const initialState = {
  listMessage: [],
  listResultSearch: [],
  searchSelected: null,
  messageReply: null,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_MESSAGE_SUCCESS:
      return { ...state, listMessage: [] };
    case SET_CURRENT_ROOM_SUCCESS:
      return { ...state, listMessage: [] };
    case RES_SENT_MESSAGE_SOCKET_SUCCCESS:
      return { ...state, listMessage: [...state.listMessage, action.payload] }; //concat object to array
    case GET_LIST_MESSAGE_SUCCESS:
      return { ...state, listMessage: [...action.payload, ...state.listMessage] }; //array to array
    case RES_REMOVE_MESSAGE_SOCKET_SUCCESS:
      return { ...state, listMessage: state.listMessage.filter((message) => message._id !== action.payload.messageId) };
    //reaction
    case RES_SENT_REACTION_SUCCESS:
      return {
        ...state,
        listMessage: state.listMessage.map((message) =>
          message._id === action.payload._id ? { ...message, reaction: action.payload.reaction } : message
        ),
      };
    case RES_CHANGE_NAME_GROUP_SUCCESS:
    case RES_CHANGE_AVATAR_GROUP_SUCCESS:
      return { ...state, listMessage: [...state.listMessage, action.payload.messageNotif] };
    //setting

    case RES_LEAVE_GROUP_SUCCESS:
      return {
        ...state,
        listMessage: [
          ...state.listMessage.map((message) =>
            message.chatRoom === action.payload.groupId &&
            message.messageType !== "notification" &&
            message.user._id === action.payload.userId
              ? { ...message, isDelete: true }
              : message
          ),
          action.payload.messageNotifCreat,
        ],
      };
    case ADD_MEMBER_GROUP_CHAT_SUCCESS:
      return {
        ...state,
        listMessage: [
          ...state.listMessage.map((message) =>
            message.chatRoom === action.payload.roomUpdate.groupId &&
            message.messageType !== "notification" &&
            action.payload.memberAdded.indexOf(message.user._id) !== -1 &&
            message.isDelete
              ? { ...message, isDelete: false }
              : message
          ),
          ...action.payload.messageNotification, //array with many member message added
        ],
      };
    case GET_LIST_SEARCH_MESSAGE_SUCCESS:
      return {
        ...state,
        listResultSearch: action.payload,
        searchSelected: action.payload.length ? action.payload[action.payload.length - 1]._id : null, //save last item selected after search result
      };
    case SET_INDEX_SEARCH_MESSAGE_SUCCESS:
      return { ...state, searchSelected: action.payload };
    case FIND_LIST_MESSAGE_SEARCH_SUCCESS:
      return { ...state, listMessage: [...state.listMessage, ...action.payload.listMessage] };
    case RESET_SEARCH_MESSAGE_SUCCESS:
      return { ...state, searchSelected: null, listResultSearch: [] };
    // reply
    case SET_MESSAGE_REPLY_SUCCESS:
      return { ...state, messageReply: action.payload };
    default:
      return state;
  }
};

export default messageReducer;
