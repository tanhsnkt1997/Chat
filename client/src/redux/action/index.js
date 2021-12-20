export const AUTH_FETCH_ASYNC = "AUTH_FETCH_ASYNC";
export const LOGIN_FETCH_ASYNC = "LOGIN_FETCH_ASYNC";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";

export const AUTH_FETCH_START = "AUTH_FETCH_START";
export const AUTH_FETCH_SUCCEED = "AUTH_FETCH_SUCCEED";
export const AUTH_FETCH_FAILED = "AUTH_FETCH_FAILED";
export const CHECK_USER_SESSION = "CHECK_USER_SESSION";

const authActions = {
  asyncFetch(payload) {
    return { type: AUTH_FETCH_ASYNC, payload };
  },

  loginFetch(payload) {
    return { type: LOGIN_FETCH_ASYNC, payload };
  },

  logoutFetch() {
    return { type: LOGIN_FETCH_ASYNC };
  },

  startFetch() {
    return { type: AUTH_FETCH_START };
  },

  successFetch(payload) {
    return { type: AUTH_FETCH_SUCCEED, payload };
  },

  failFetch(payload) {
    return { type: AUTH_FETCH_FAILED, payload };
  },

  //register
  checkUserSession() {
    return { type: CHECK_USER_SESSION };
  },
  //logout
  logout() {
    return { type: LOGOUT_USER };
  },
};

export default authActions;
