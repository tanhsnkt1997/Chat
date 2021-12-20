import React, { useEffect, useRef } from "react";
import CallIcon from "@material-ui/icons/Call";
import CallEndIcon from "@material-ui/icons/CallEnd";
import { useDispatch, useSelector } from "react-redux";
import socketAction from "../../../../../redux/action/socket";

const ModalIncoming = ({
  typeCurrentRoom,
  acceptCall,
  receivingCall,
  handleClose,
  isOpenModal,
  isUseVideo,
  setOpenVideo,
  setOpenAudio,
}) => {
  const dispatch = useDispatch();
  const timer = useRef(null); // we can save timer in useRef and pass it to child
  const onCloseTab = () => {
    window.opener = null;
    window.open("", "_self");
    window.close();
  };

  useEffect(() => {
    // // if 1m don't have member accept cancel call.
    // timer.current = setTimeout(() => {
    //   handleClose();
    // }, 10000);
    // return () => {
    //   clearTimeout(timer.current);
    //   timer.current = null;
    // };
  }, []);

  const handleAccept = () => {
    clearTimeout(timer.current);
    timer.current = null;
    acceptCall();
    if (receivingCall.isUseVideo) {
      setOpenVideo(false);
    } else if (!receivingCall.isUseVideo) {
      setOpenAudio(false);
    }
    // isOpenModal(false);
  };

  const handleCloseComming = () => {
    dispatch(socketAction.cancelCall()); //in redux
    if (typeCurrentRoom === "direct") {
      dispatch(socketAction.rejectCall({ idCaller: receivingCall.idCaller }));
    }

    if (receivingCall.isUseVideo) {
      setOpenVideo(false);
    } else if (!receivingCall.isUseVideo) {
      setOpenAudio(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${receivingCall.imgCaller})`,
        width: "100%",
        height: "250px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundPosition: "center center",
      }}
    >
      <h2 style={{ color: "#fff", textShadow: "3px 3px 20px #ff99cc,-2px 1px 30px #ff99cc" }}>
        {receivingCall.nameCaller} is calling you !!
      </h2>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          className="videoModal__toolbox_icon_wraper"
          style={{ background: "green", padding: "12px" }}
          onClick={handleAccept}
        >
          <CallIcon style={{ color: "#fff" }} />
        </div>

        <div
          className="videoModal__toolbox_icon_wraper"
          style={{ background: "red", padding: "12px" }}
          onClick={handleCloseComming}
        >
          <CallEndIcon style={{ color: "#fff" }} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ModalIncoming);
