import React, { useState, useEffect, useRef } from "react";
import Modal from "@material-ui/core/Modal";
import Peer from "simple-peer";
import CloseIcon from "@material-ui/icons/Close";
import MissedVideoCallIcon from "@material-ui/icons/MissedVideoCall";
import { useDispatch, useSelector } from "react-redux";
import socketAction from "../../../../../redux/action/socket";
import _ from "lodash";
import "./VideoCall.css";
import VideoModal from "./videoModal.jsx";
import GroupModalCall from "./groupModalCall.jsx";
import IncomingModal from "./modalIncoming.jsx";

const VideoCall = ({
  memberCurrenRoom,
  userId,
  typeCurrentRoom,
  currentRoomId,
  userImg,
  currentRoomAvatar,
  currentRoomName,
  children,
  setOpenVideo,
  setOpenAudio,
}) => {
  const dispatch = useDispatch();
  const [openModal, isOpenModal] = useState(false);
  const [isReceivingCall, setReceivingCall] = useState(false);

  const iCalling = useRef(false);
  const isAcceptCall = useRef(false);
  const receivingCall = useSelector((state) => state.room.call);
  const storeAcceptCall = useSelector((state) => state.room.acceptCall);
  const { _id, displayName } = useSelector((state) => state.auth.user);
  console.log("receivingCall----------------------------------->", receivingCall);

  // useEffect(() => {
  //   if (!_.isEmpty(receivingCall)) {
  //     alert("da vao");
  //     isOpenModal(true);
  //     setReceivingCall(true);
  //   }
  // }, [receivingCall]);

  const handleClose = () => {
    console.log("close modal recevicing call========>");
    dispatch(socketAction.cancelCall());
    if (receivingCall.isUseVideo) {
      setOpenVideo(false);
    } else if (!receivingCall.isUseVideo) {
      setOpenAudio(false);
    }

    // isOpenModal(false);
    // setReceivingCall(false); //set fix bug
  };

  const acceptCall = () => {
    if (receivingCall.isUseVideo) {
      setOpenVideo(false);
    } else if (receivingCall.isUseVideo) {
      setOpenAudio(false);
    }

    window.open(
      `/groupcall/${currentRoomId}?video=${receivingCall.isUseVideo}`,
      "_blank",
      "location=yes,height=%100,width=%100,left=0,location=0,scrollbars=yes,status=yes"
    );
  };

  const callToYou = () => {
    if (isReceivingCall) {
      return (
        <IncomingModal
          typeCurrentRoom={typeCurrentRoom}
          acceptCall={acceptCall}
          receivingCall={receivingCall}
          handleClose={handleClose}
          isOpenModal={isOpenModal}
        />
      );
    }
  };

  return (
    <>
      <IncomingModal
        acceptCall={acceptCall}
        receivingCall={receivingCall}
        // handleClose={handleClose}
        isOpenModal={isOpenModal}
        isUseVideo={receivingCall.isUseVideo}
        setOpenVideo={setOpenVideo}
        setOpenAudio={setOpenAudio}
      />
      {/* {children}

      <Modal
        open={openModal}
        // onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={"modal"}
        disableBackdropClick={true}
      >
        <div
          className={`${
            typeCurrentRoom === "direct" ? "modalAdd__container" : "modalAdd__groupCall_container"
          }`}
        >
          <div className="modalAdd__body">
            {callToYou()}
            {!isReceivingCall && openModal && typeCurrentRoom === "direct" && (
              <VideoModal
                memberCurrenRoom={memberCurrenRoom}
                userId={userId}
                iCalling={iCalling.current}
                isAcceptCall={isAcceptCall.current}
                caller={receivingCall.from}
                callerSignal={receivingCall.signal}
                partnerSignal={storeAcceptCall.signal}
                isOpenModal={isOpenModal}
              />
            )}
          </div>
        </div>
      </Modal> */}
    </>
  );
};

export default React.memo(VideoCall);
