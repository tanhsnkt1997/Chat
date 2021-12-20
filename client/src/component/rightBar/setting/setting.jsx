import React from "react";
import { useSelector } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";
import Base from "../base/base.jsx";
import ChangeName from "./changeName/changeName.jsx";
import ChangeAvatar from "./changeAvatar/changeAvatar.jsx";
import Privacy from "./Privacy/privacy.jsx";
import LayoutListDrop from "../../base/layoutListDrop.jsx";
import "./Setting.css";

const Setting = ({ setOpen, setOpenRightBar }) => {
  const currenRoomId = useSelector((state) => state.room.currentRoom._id);

  return (
    <Base setOpen={setOpen} title={"Setting"} description={"Seting room chat"}>
      <LayoutListDrop name={"Setting chat."}>
        <div className="rightBar_setting_body">
          <ChangeName currenRoomId={currenRoomId} />
          <ChangeAvatar currenRoomId={currenRoomId} />
        </div>
      </LayoutListDrop>
      <LayoutListDrop name={"Privacy and support."}>
        <Privacy currenRoomId={currenRoomId} setOpen={setOpen} setOpenRightBar={setOpenRightBar} />
      </LayoutListDrop>
    </Base>
  );
};

export default Setting;
