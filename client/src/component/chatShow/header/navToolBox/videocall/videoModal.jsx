import React, { useState, useEffect, useRef } from "react";
import Modal from "@material-ui/core/Modal";
import Peer from "simple-peer";
import CloseIcon from "@material-ui/icons/Close";
import MissedVideoCallIcon from "@material-ui/icons/MissedVideoCall";
import { useDispatch, useSelector } from "react-redux";
import CallEndIcon from "@material-ui/icons/CallEnd";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import socketAction from "../../../../../redux/action/socket";
import _ from "lodash";
import "./VideoCall.css";

const VideoModal = ({
  memberCurrenRoom,
  userId,
  iCalling,
  isAcceptCall,
  caller,
  callerSignal,
  partnerSignal,
  isOpenModal,
}) => {
  const [isPauseMic, setPauseMic] = useState(false);
  const [isPauseVideo, setPauseVideo] = useState(false);

  const myVideo = useRef();
  const partnerVideo = useRef();
  const connectionRef = useRef();
  const currentStreamRef = useRef(null);
  const dispatch = useDispatch();

  /**
   *
   */
  useEffect(() => {
    if (!_.isEmpty(partnerSignal)) {
      connectionRef.current.signal(partnerSignal);
    }
  }, [partnerSignal]);

  /**
   *
   */
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        currentStreamRef.current = currentStream;
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
        if (iCalling) {
          handleCall(currentStream);
        }
        if (isAcceptCall) {
          acceptCall(currentStream);
        }
      })
      .catch((error) => {
        console.log("navigator.mediaDevices.getUserMedia error:", error);
      });
  }, []);

  /**
   *
   * @param {*} stream
   */
  const handleCall = (stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
        ],
      },
      stream: stream,
    });

    peer.on("signal", (data) => {
      if (memberCurrenRoom && userId) {
        dispatch(
          socketAction.callUser({ userToCall: memberCurrenRoom, signalData: data, from: userId })
        );
      }
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    connectionRef.current = peer;
  };

  /**
   *
   * @param {*} stream
   */
  const acceptCall = (stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      dispatch(
        socketAction.acceptVideoCall({
          signal: data,
          to: caller,
        })
      );
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    console.log("callerSignal in acceptcall", callerSignal);

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

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

  const leaveCall = () => {
    connectionRef.current.destroy();
    //stop track all audio and video
    currentStreamRef.current.getTracks().forEach(function (track) {
      if (track.readyState === "live") {
        track.stop();
        isOpenModal(false); //callback turn off video modal
        dispatch(socketAction.cancelCall());
      }
    });
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <video playsInline ref={partnerVideo} autoPlay style={{ width: "100%", height: "100%" }} />
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          style={{
            width: "30%",
            height: "30%",
            border: "1px soild blue",
            position: "absolute",
            bottom: 0,
            right: 0,
            background: "black",
            borderRadius: "5px",
            marginBottom: "5px",
          }}
        />
      </div>
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
    </div>
  );
};

export default React.memo(VideoModal);
