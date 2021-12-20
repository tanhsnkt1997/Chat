import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CircularProgress from "@material-ui/core/CircularProgress";
import settingAction from "../../../../redux/action/setting";
import ButtonToggleNav from "../../base/buttonToggleNav.jsx";
import "./Header.css";

const Header = ({ setOpenNavbar, openNavbar }) => {
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.auth.user);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [infoUser.avatar]);

  const chooseAvatar = (file) => {
    if (file) {
      setIsLoading(true);
      const avtarFormData = new FormData();
      avtarFormData.append("file", file);
      dispatch(settingAction.updateAvatar(avtarFormData));
    }
  };
  return (
    <div className="sideBar_profile_header_container">
      <ButtonToggleNav setOpenNavbar={setOpenNavbar} openNavbar={openNavbar} />
      <div className="sideBar_profile_header_first">
        <span className="sideBar_profile_header_title">Setting</span>
        <MoreVertIcon className="sideBar_profile_header_icon" />
      </div>
      <div className="sideBar_profile_header_info_container">
        <label htmlFor="select-img-change-avatar">
          {isLoading ? (
            <CircularProgress color="secondary" size={20} />
          ) : (
            <img src={infoUser.avatar} alt="avatar" className="sideBar_profile_header_info_avatar" />
          )}
        </label>

        <input
          type={"file"}
          accept="image/*"
          onChange={(e) => chooseAvatar(e.target.files[0])}
          multiple={false}
          style={{ display: "none" }}
          id="select-img-change-avatar"
          disabled={isLoading ? true : false}
        />
        <span className="sideBar_profile_header_info_name">{infoUser.displayName}</span>
        <div className="sideBar_profile_header_info_status">
          <div className="sideBar_profile_header_info_status_dot" />
          <span className="sideBar_profile_header_info_status_name">{infoUser.isActive ? "Actived" : "No Active"}</span>
        </div>
      </div>

      <span className="sideBar_profile_header_quete_container">{infoUser.about}</span>
    </div>
  );
};

export default React.memo(Header);
