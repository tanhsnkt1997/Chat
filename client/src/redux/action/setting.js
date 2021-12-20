export const START_UPDATE_PROFILE = "START_UPDATE_PROFILE";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_AVATAR = "UPDATE_AVATAR";
export const UPDATE_AVATAR_SUCCESS = "UPDATE_AVATAR_SUCCESS";

const settingAction = {
  updateProfile(payload) {
    return { type: UPDATE_PROFILE, payload };
  },
  updateAvatar(payload) {
    return { type: UPDATE_AVATAR, payload };
  },
};

export default settingAction;
