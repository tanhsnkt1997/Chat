import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateIcon from "@material-ui/icons/Create";
import SaveIcon from "@material-ui/icons/Save";
import CircularProgress from "@material-ui/core/CircularProgress";

import settingAction from "../../../../../redux/action/setting";

const About = () => {
  const dispatch = useDispatch();
  const profileStore = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.profile.loading);

  const [isEditProfile, setEditProfile] = useState(false);
  const [profile, setProfile] = useState({
    displayName: "",
  });

  useEffect(() => {
    setProfile({ displayName: profileStore.displayName });
    isEditProfile && setEditProfile(false);
  }, [profileStore.displayName]);

  const handUpdate = () => {
    if (profileStore.displayName !== profile.displayName) {
      dispatch(settingAction.updateProfile({ displayName: profile.displayName }));
    }
  };

  return (
    <>
      <div className="sideBar_setting_body_about_head_icon_pen_wraper">
        {isLoading ? (
          <CircularProgress color="secondary" size={20} />
        ) : isEditProfile ? (
          <SaveIcon className="sideBar_setting_body_about_head_icon_pen" onClick={handUpdate} />
        ) : (
          <CreateIcon
            className="sideBar_setting_body_about_head_icon_pen"
            onClick={() => setEditProfile(true)}
          />
        )}
      </div>
      <div className="sideBar_setting_body_about_content_name">
        <span className="sideBar_setting_body_about_content_name_lable">Name</span>
        <input
          className={`${
            isEditProfile
              ? "sideBar_setting_body_input_about_content_edit"
              : "sideBar_setting_body_about_content_name_content"
          }`}
          onChange={(e) => {
            setProfile({ ...profile, displayName: e.target.value });
          }}
          value={profile.displayName}
        />
      </div>
    </>
  );
};

export default React.memo(About);
