import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CallEndIcon from "@material-ui/icons/CallEnd";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import socketAction from "../../../../../redux/action/socket";

const ToolBoxVideo = ({ currentStreamRef, connectionRef, userId, currentRoomId }) => {
  const dispatch = useDispatch();

  const [isPauseMic, setPauseMic] = useState(false);
  const [isPauseVideo, setPauseVideo] = useState(false);

  const toggleTrack = (type) => {
    //type is video and audio
    if (currentStreamRef.current) {
      currentStreamRef.current.getTracks().forEach(function (track) {
        if (track.readyState === "live" && track.kind === type) {
          track.enabled = !track.enabled;
        }
        type === "video" ? setPauseVideo((state) => !state) : setPauseMic((state) => !state);
      });
    }
  };

  const onCloseTab = () => {
    window.opener = null;
    window.open("", "_self");
    window.close();
  };

  const leaveCall = () => {
    onCloseTab();
    // connectionRef.current.destroy();
    connectionRef.current.forEach((connection) => {
      connection.peer.destroy();
    });
    //stop track all audio and video
    currentStreamRef.current.getTracks().forEach(function (track) {
      if (track.readyState === "live") {
        track.stop();
        // isOpenModal(false); //callback turn off video modal
        dispatch(socketAction.cancelCall()); //remove in redux
        // dispatch(socketAction.cancelSignalGroupCall({ userIdLeave: userId, currentRoomId })); //remove in socket server
      }
    });
  };

  return (
    <div className="videoModal__toolbox_wraper">
      <div className="videoModal__toolbox_icon_wraper" onClick={() => toggleTrack("audio")}>
        {isPauseMic ? (
          <MicOffIcon className="videoModal__toolbox_icon" />
        ) : (
          <MicIcon className="videoModal__toolbox_icon" />
        )}
      </div>
      <div
        className="videoModal__toolbox_icon_wraper"
        style={{ background: "red", padding: "12px" }}
        onClick={leaveCall}
      >
        <CallEndIcon
          className="videoModal__toolbox_icon"
          style={{ color: "#fff", fontSize: "1.6rem" }}
        />
      </div>
      <div className="videoModal__toolbox_icon_wraper" onClick={() => toggleTrack("video")}>
        {isPauseVideo ? (
          <VideocamOffIcon className="videoModal__toolbox_icon" />
        ) : (
          <VideocamIcon className="videoModal__toolbox_icon" />
        )}
      </div>
    </div>
  );
};

export default React.memo(ToolBoxVideo);
