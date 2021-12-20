import React, { useState, useEffect } from "react";
import "./RighBar.css";
import { useSelector } from "react-redux";

import AppsIcon from "@material-ui/icons/Apps";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

import AddMember from "./addMember/addMember.jsx";
import File from "./file/files.jsx";
import Setting from "./setting/setting.jsx";

const RightBar = ({ setOpenRightBar }) => {
  const [open, setOpen] = useState(false);
  const roomId = useSelector((state) => state.room.currentRoom?._id);

  //kiem tra lai
  const listComponent = [
    { key: "memeber", component: <AddMember setOpen={setOpen} roomId={roomId} /> },
    { key: "file", component: <File setOpen={setOpen} roomId={roomId} /> },
    { key: "setting", component: <Setting setOpen={setOpen} setOpenRightBar={setOpenRightBar} roomId={roomId} /> },
  ];

  return (
    <div style={{ display: "flex" }}>
      {listComponent.map((item, index) => item.key === open && <div key={index}>{item.component}</div>)}
      <div className="RightBar__container">
        <div className="RightBar__first_wraper">
          <div className="RightBar__first_item_wraper RightBar__first_item_dashboard">
            <AppsIcon
              onClick={() => {
                setOpenRightBar((state) => !state);
              }}
              className="RightBar__first_item_dashboard_icon"
            />
            <h5 className="RightBar__first_item_title">Apps</h5>
          </div>

          <div className="RightBar__first_item_wraper">
            <div
              className="RightBar__first_item_border"
              style={{ background: "#3fcc35", opacity: open === "memeber" && 1 }}
              onClick={() => {
                setOpen("memeber");
              }}
            >
              <GroupAddIcon className="RightBar__first_item_member_icon" />
            </div>
            <h5 className="RightBar__first_item_title">Members</h5>
          </div>

          <div className="RightBar__first_item_wraper">
            <div
              className="RightBar__first_item_border"
              style={{ background: "#1c9dea", opacity: open === "file" && 1 }}
              onClick={() => {
                setOpen("file");
              }}
            >
              <InsertDriveFileOutlinedIcon className="RightBar__first_item_member_icon" />
            </div>
            <h5 className="RightBar__first_item_title">Files</h5>
          </div>

          <div className="RightBar__first_item_wraper">
            <div
              className="RightBar__first_item_border"
              style={{ background: "#1c9dea", opacity: open === "setting" && 1 }}
              onClick={() => {
                setOpen("setting");
              }}
            >
              <SettingsOutlinedIcon className="RightBar__first_item_member_icon" />
            </div>
            <h5 className="RightBar__first_item_title">Setting</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RightBar);
