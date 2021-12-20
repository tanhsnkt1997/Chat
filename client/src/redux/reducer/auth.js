import {
  AUTH_FETCH_START,
  AUTH_FETCH_SUCCEED,
  AUTH_FETCH_FAILED,
  AUTH_FETCH_ASYNC,
  LOGOUT_USER_SUCCESS,
} from "../action/index";
import { START_UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_AVATAR_SUCCESS } from "../action/setting";
// const reservation_prop = Object.assign({}, this.state, free_room)

const initialState = {
  user: null,
  loading: false,
  error: false,
  isAuthenticated: null,
  //
  profile: {
    loading: false,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_FETCH_START:
      return { ...state, loading: true };
    case AUTH_FETCH_SUCCEED:
      return { ...state, user: action.payload, loading: false, isAuthenticated: true };
    case AUTH_FETCH_FAILED:
      return { ...state, user: null, loading: false, isAuthenticated: false };
    // update
    case START_UPDATE_PROFILE:
      return { ...state, profile: { ...state.profile, loading: true } };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, user: action.payload, profile: { ...state.profile, loading: false } };
    case UPDATE_AVATAR_SUCCESS:
      return { ...state, user: action.payload };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        profile: {
          loading: false,
        },
        loading: false,
        error: false,
      };

    default:
      return state;
  }
};

export default authReducer;
