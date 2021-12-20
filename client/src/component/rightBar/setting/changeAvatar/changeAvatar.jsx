import React from "react";
import { useDispatch, useSelector } from "react-redux";
import socketAction from "../../../../redux/action/socket";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import "./ChangeAvatar.css";

const ChangeAvatar = ({ currenRoomId }) => {
  const dispatch = useDispatch();
  const chooseAvatar = (file) => {
    if (file) {
      const avtarFormData = new FormData();
      avtarFormData.append("roomId", currenRoomId);
      avtarFormData.append("file", file);
      dispatch(socketAction.changeAvatar(avtarFormData));
    }
  };
  return (
    <div style={{ cursor: "pointer", display: "flex", alignItems: "center", margin: "10px 0px" }}>
      <InsertPhotoIcon style={{ fontSize: 16 }} />
      <label htmlFor="select-img-change-avatar-group" style={{ marginLeft: 10 }}>
        <div>Thay đổi ảnh</div>
      </label>
      <input
        type={"file"}
        accept="image/*"
        onChange={(e) => chooseAvatar(e.target.files[0])}
        multiple={false}
        style={{ display: "none" }}
        id="select-img-change-avatar-group"
      />
    </div>
  );
};

export default React.memo(ChangeAvatar);
