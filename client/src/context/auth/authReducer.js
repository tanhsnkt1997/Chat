const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("nhan dc", action.payload);
      return { user: action.payload, isFetching: true, error: false };

    default:
      return state;
  }
};

export default authReducer;
