import React from "react";
import LeaveRoom from "./LeaveRoom/leaveRoom.jsx";
import "./Privacy.css";

const Privacy = ({ currenRoomId, setOpen, setOpenRightBar }) => {
  return (
    <div className="rightBar_setting_body">
      <LeaveRoom currenRoomId={currenRoomId} setOpen={setOpen} setOpenRightBar={setOpenRightBar} />
    </div>
  );
};

export default React.memo(Privacy);
