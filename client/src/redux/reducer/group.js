import {
  GET_LIST_GROUP_CHAT_SUCESS,
  LOADING_SEARCH_GROUP,
  START_GROUP_SEARCH_SUCCESS,
  GET_LIST_GROUP_SEARCH_SUCCESS,
  GET_LIST_GROUP_SEARCH_MORE_SUCCESS,
  //right bar
  GET_LIST_CONTACT_OUTER_GROUP_SUCCESS,
} from "../action/group";
import {
  //mesage
  RES_REMOVE_MESSAGE_SOCKET_SUCCESS,
  //setting
  RES_CHANGE_NAME_GROUP_SUCCESS,
  RES_CHANGE_AVATAR_GROUP_SUCCESS,
  ADD_MEMBER_GROUP_CHAT_SUCCESS,
  RES_ADD_MEMBER_GROUP_AXIOS_SUCCESS,
  RES_LEAVE_GROUP_AXIOS_SUCCESS,
} from "../action/socket";

const initialState = {
  listMemberOuterGroup: [],
  listOnlyGroup: {
    total: 0,
    data: [],
  },
  query: "",
  listRoomSearch: {
    loading: false,
    total: 0,
    data: [],
  },
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_GROUP_CHAT_SUCESS:
      return {
        ...state,
        listOnlyGroup: {
          total: action.payload.totalCount,
          data: [...state.listOnlyGroup.data, ...action.payload.data],
        },
      };
    //search
    case LOADING_SEARCH_GROUP:
      return { ...state, listRoomSearch: { ...state.listRoomSearch, loading: true } };
    case START_GROUP_SEARCH_SUCCESS:
      return {
        ...state,
        query: action.payload.text,
      };
    case GET_LIST_GROUP_SEARCH_SUCCESS:
      return {
        ...state,
        listRoomSearch: {
          total: action.payload.totalCount,
          data: action.payload.data,
        },
      };

    case GET_LIST_GROUP_SEARCH_MORE_SUCCESS:
      return {
        ...state,
        listRoomSearch: {
          total: action.payload.totalCount,
          data: [...state.listRoomSearch.data, ...action.payload.data],
        },
      };
    //message
    // setting
    case RES_CHANGE_NAME_GROUP_SUCCESS:
      return {
        ...state,
        listOnlyGroup: {
          ...state.listOnlyGroup,
          data: state.listOnlyGroup.data.map((group) =>
            group._id === action.payload.roomId ? { ...group, name: action.payload.name } : group
          ),
        },
      };
    case RES_CHANGE_AVATAR_GROUP_SUCCESS:
      return {
        ...state,
        listOnlyGroup: {
          ...state.listOnlyGroup,
          data: state.listOnlyGroup.data.map((group) =>
            group._id === action.payload.roomId ? { ...group, chatIcon: action.payload.avatar } : group
          ),
        },
      };
    //right bar
    case RES_LEAVE_GROUP_AXIOS_SUCCESS:
      return {
        ...state,
        //remove roon with group Id
        listOnlyGroup: {
          total: state.total - 1,
          data: state.listOnlyGroup.data.filter((group) => group._id !== action.payload.groupId),
        },
        listRoomSearch: {
          total: state.total - 1,
          data: state.listRoomSearch.data.filter((group) => group._id !== action.payload.groupId),
        },
      };
    case GET_LIST_CONTACT_OUTER_GROUP_SUCCESS:
      return { ...state, listMemberOuterGroup: action.payload };
    case ADD_MEMBER_GROUP_CHAT_SUCCESS:
      const isRoomExits =
        state.listOnlyGroup.data.findIndex((room) => room._id === action.payload.roomUpdate._id) !== -1;
      return {
        ...state, // filter member outer group
        listMemberOuterGroup: isRoomExits
          ? state.listMemberOuterGroup.filter(
              (memberOuter) =>
                !action.payload.memberAdded.some(
                  (memberId) => memberId === memberOuter.contactId || memberId === memberOuter.userId
                )
            )
          : state.listMemberOuterGroup,
        //update list only group with new member
        listOnlyGroup: {
          ...state.listOnlyGroup,
          data: isRoomExits
            ? state.listOnlyGroup.data.map((room) =>
                room._id === action.payload.roomUpdate._id
                  ? {
                      ...room,
                      members: action.payload.roomUpdate.members,
                    }
                  : room
              )
            : [action.payload.roomUpdate, ...state.listOnlyGroup.data],
        },
      };
    default:
      return state;
  }
};

export default groupReducer;
