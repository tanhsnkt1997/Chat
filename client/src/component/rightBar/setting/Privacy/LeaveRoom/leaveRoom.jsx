import React from "react";
import { useDispatch } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import socketAction from "../../../../../redux/action/socket";
import "./LeaveRoom.css";

const LeaveRoom = ({ currenRoomId, setOpen, setOpenRightBar }) => {
  const dispatch = useDispatch();
  const handleLeave = () => {
    dispatch(socketAction.leaveGroup({ currenRoomId }));
    //kiem tra lai
    setOpen(false);
    setOpenRightBar(false);
  };
  return (
    <div style={{ cursor: "pointer", display: "flex", alignItems: "center", margin: "10px 0px" }} onClick={handleLeave}>
      <ExitToAppIcon style={{ fontSize: 16 }} />
      <span style={{ marginLeft: 10 }}>Leave room</span>
    </div>
  );
};

export default React.memo(LeaveRoom);
