import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PhoneIcon from "@material-ui/icons/Phone";
import VideoCallWraper from "../videoCallWraper.jsx";
import socketAction from "../../../../../../redux/action/socket";

const VideoCall = ({
  memberCurrenRoom,
  userId,
  typeCurrentRoom,
  currentRoomId,
  userImg,
  currentRoomAvatar,
  currentRoomName,
}) => {
  const dispatch = useDispatch();
  return (
    <VideoCallWraper
      memberCurrenRoom={memberCurrenRoom}
      userId={userId}
      typeCurrentRoom={typeCurrentRoom}
      currentRoomId={currentRoomId}
      userImg={userImg}
      currentRoomAvatar={currentRoomAvatar}
      currentRoomName={currentRoomName}
    >
      <div
        className="chatShow___header_navToolBox_icon_wraper"
        onClick={() => {
          window
            .open(
              `/groupcall/${currentRoomId}?video=${false}`,
              "_blank",
              "location=yes,height=%100,width=%100,left=0,location=0,scrollbars=yes,status=yes"
            )
            ?.focus();
          dispatch(
            socketAction.groupStartCall({
              memberGroup: memberCurrenRoom,
              idCaller: userId,
              nameCaller: currentRoomName,
              imgCaller: currentRoomAvatar,
              isUseVideo: false,
            })
          );
        }}
      >
        <PhoneIcon className="chatShow___header_navToolBox_icon" />
      </div>
    </VideoCallWraper>
  );
};

export default React.memo(VideoCall);
