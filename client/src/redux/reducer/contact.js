import {
  RES_USER_ONLINE,
  RES_USER_OFFLINE,
  RES_ADDFRIEND_SOCKET,
  RES_ACCEPT_FRIEND_SOCKET,
  REQ_REJECT_FRIEND_SOCKET_SUCCESS,
  RES_REJECT_FRIEND_SOCKET,
  REQ_ACCEPT_FRIEND_SOCKET_SUCCESS,
} from "../action/socket";
import {
  LOADING_SEARCH_CONTACT,
  GET_LIST_CONTACT_SUCCESS,
  GET_LIST_REQUEST_CONTACT_SUCCESS,
  START_CONTACT_SEARCH_SUCCESS,
  GET_LIST_CONTACT_SEARCH_SUCCESS,
  GET_LIST_CONTACT_SEARCH_MORE_SUCCESS,
  LOADING_SEARCH_REQ_CONTACT,
  GET_LIST_REQ_CONTACT_SEARCH_SUCCESS,
  GET_LIST_REQ_CONTACT_SEARCH_MORE_SUCCESS,
} from "../action/contact";

const initState = {
  listFriend: {
    total: 0,
    data: [],
  },
  listReq: {
    total: 0,
    data: [],
  },
  query: "",
  listFriendSearch: {
    loading: false,
    total: 0,
    data: [],
  },
  listReqSearch: {
    loading: false,
    total: 0,
    data: [],
  },
};

const contactReducer = (state = initState, action) => {
  switch (action.type) {
    case RES_USER_ONLINE:
      return {
        ...state,
        listFriend: {
          ...state.listFriend,
          data: state.listFriend.data.map((friend) =>
            friend.userId === action.payload || friend.contactId === action.payload
              ? { ...friend, isOnline: true }
              : friend
          ),
        },
      };
    case RES_USER_OFFLINE:
      return {
        ...state,
        listFriend: {
          ...state.listFriend,
          data: state.listFriend.data.map((friend) =>
            friend.userId === action.payload || friend.contactId === action.payload
              ? { ...friend, isOnline: false }
              : friend
          ),
        },
      };
    case GET_LIST_CONTACT_SUCCESS: //friend
      return {
        ...state,
        listFriend: {
          total: action.payload.totalCount,
          data: [...state.listFriend.data, ...action.payload.data],
        },
      };
    case GET_LIST_REQUEST_CONTACT_SUCCESS:
      return {
        ...state,
        listReq: {
          total: action.payload.totalCount,
          data: [...state.listReq.data, ...action.payload.data],
        },
      };
    case RES_ADDFRIEND_SOCKET:
      return { ...state, listReq: [...state.listReq, action.payload] };

    case REQ_ACCEPT_FRIEND_SOCKET_SUCCESS:
    case RES_ACCEPT_FRIEND_SOCKET:
      return {
        ...state,
        listFriend: { ...state.listFriend, data: [action.payload, ...state.listFriend.data] },
        listReq: state.listReq.filter((item) => item._id !== action.payload._id),
      };
    case REQ_REJECT_FRIEND_SOCKET_SUCCESS:
      return { ...state, listReq: state.listReq.filter((item) => item._id !== action.payload) }; //payload is id
    case RES_REJECT_FRIEND_SOCKET:
      return { ...state }; //payload is id

    //search
    case LOADING_SEARCH_CONTACT:
      return { ...state, listFriendSearch: { ...state.listFriendSearch, loading: true } };
    case LOADING_SEARCH_REQ_CONTACT:
      return { ...state, listReqSearch: { ...state.listReqSearch, loading: true } };
    case START_CONTACT_SEARCH_SUCCESS:
      return {
        ...state,
        query: action.payload.text,
      };
    case GET_LIST_CONTACT_SEARCH_SUCCESS:
      return {
        ...state,
        listFriendSearch: {
          total: action.payload.totalCount,
          data: action.payload.data,
          loading: false,
        },
      };

    case GET_LIST_CONTACT_SEARCH_MORE_SUCCESS:
      return {
        ...state,
        listFriendSearch: {
          total: action.payload.totalCount,
          data: [...state.listFriendSearch.data, ...action.payload.data],
        },
      };
    case GET_LIST_REQ_CONTACT_SEARCH_SUCCESS:
      return {
        ...state,
        listReqSearch: {
          total: action.payload.totalCount,
          data: action.payload.data,
          loading: false,
        },
      };

    case GET_LIST_REQ_CONTACT_SEARCH_MORE_SUCCESS:
      return {
        ...state,
        listReqSearch: {
          total: action.payload.totalCount,
          data: [...state.listReqSearch.data, ...action.payload.data],
        },
      };
    default:
      return state;
  }
};

export default contactReducer;
