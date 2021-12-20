import React from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useSelector } from "react-redux";
import AppsIcon from "@material-ui/icons/Apps";
import VideoCall from "./videocall/videoCall/videoCall.jsx";
import AudioCall from "./videocall/audioCall/audioCall.jsx";
import Search from "./search/search.jsx";
import Call from "./videocall/call.jsx";
import "./NavToolBox.css";

const NavToolBox = ({ setOpenRightBar, setIsSearch }) => {
  const memberCurrenRoom = useSelector((state) => state.room.currentRoom?.members);
  const typeCurrentRoom = useSelector((state) => state.room.currentRoom?.chatType);
  const currentRoomId = useSelector((state) => state.room.currentRoom?._id);
  const currentRoomAvatar = useSelector((state) => state.room.currentRoom?.chatIcon);
  const currentRoomName = useSelector((state) => state.room.currentRoom?.name);
  const userId = useSelector((state) => state.auth.user?._id);
  const userImg = useSelector((state) => state.auth.user?.avatar);
  console.log("currentRoomId", currentRoomId);

  return (
    <div className="chatShow___header_navToolBox_container">
      <Search setIsSearch={setIsSearch} />

      <Call
        memberCurrenRoom={memberCurrenRoom}
        userId={userId}
        typeCurrentRoom={typeCurrentRoom}
        currentRoomId={currentRoomId}
        userImg={userImg}
        currentRoomAvatar={currentRoomAvatar}
        currentRoomName={currentRoomName}
      />

      {/* <AudioCall
        memberCurrenRoom={memberCurrenRoom}
        userId={userId}
        typeCurrentRoom={typeCurrentRoom}
        currentRoomId={currentRoomId}
        userImg={userImg}
        currentRoomAvatar={currentRoomAvatar}
        currentRoomName={currentRoomName}
      />

      <VideoCall
        memberCurrenRoom={memberCurrenRoom}
        userId={userId}
        typeCurrentRoom={typeCurrentRoom}
        currentRoomId={currentRoomId}
        userImg={userImg}
        currentRoomAvatar={currentRoomAvatar}
        currentRoomName={currentRoomName}
      /> */}

      <div
        className="chatShow___header_navToolBox_icon_wraper"
        onClick={() => setOpenRightBar((state) => !state)}
      >
        <AppsIcon className="chatShow___header_navToolBox_icon" />
      </div>

      <MoreHorizIcon />
    </div>
  );
};

export default React.memo(NavToolBox);
