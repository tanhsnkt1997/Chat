import React, { useState, useEffect, useRef } from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@material-ui/core/Modal";
import MissedVideoCallIcon from "@material-ui/icons/MissedVideoCall";
import _ from "lodash";
import socketAction from "../../../../../redux/action/socket";
import ModalInComing from "./videoCallWraper.jsx";

const Call = ({
  memberCurrenRoom,
  userId,
  typeCurrentRoom,
  currentRoomId,
  userImg,
  currentRoomAvatar,
  currentRoomName,
}) => {
  const dispatch = useDispatch();
  const receivingCall = useSelector((state) => state.room.call);
  const [isOpenVideo, setOpenVideo] = useState(false);
  const [isOpenAudio, setOpenAudio] = useState(false);
  const popupWindow = useRef(null);
  // const [isReceivingCall, setReceivingCall] = useState(false);

  const refreshPopupWindow = (type) => {
    // Check that an opener exists and is not closed
    console.log("popupWindow.current", popupWindow.current);
    if (window.opener && !window.opener.closed) {
      console.log("da mo");
    }
    // console.log("popupWindow.current", popupWindow.current);
    // if (popupWindow.current && !popupWindow.current.closed) {
    //   // popupWindow is open, refresh it
    //   // popupWindow.location.reload(true);
    //   console.log("popup da ton tai");
    // }
    else {
      // Open a new popup window
      if (!isOpenVideo && type === "videoCall") {
        popupWindow.current = window
          .open(
            `/groupcall/${currentRoomId}?video=${true}`,
            "Video Call",
            "location=yes,height=%100,width=%100,left=0,location=0,scrollbars=yes,status=yes"
          )
          ?.focus();
      } else if (!isOpenAudio && type === "audioCall") {
        popupWindow.current = window
          .open(
            `/groupcall/${currentRoomId}?video=${false}`,
            "Audio Call",
            "location=yes,height=%100,width=%100,left=0,location=0,scrollbars=yes,status=yes"
          )
          ?.focus();
      }
    }
  };

  useEffect(() => {
    if (!_.isEmpty(receivingCall) && receivingCall.isUseVideo) {
      setOpenVideo(true);
      // setReceivingCall(true);
    } else if (!_.isEmpty(receivingCall) && !receivingCall.isUseVideo) {
      setOpenAudio(true);
      // setReceivingCall(true);
    }
  }, [receivingCall]);

  return (
    <div style={{ display: "flex" }}>
      <div
        className="chatShow___header_navToolBox_icon_wraper"
        onClick={() => {
          refreshPopupWindow("videoCall");
          dispatch(
            socketAction.groupStartCall({
              memberGroup: memberCurrenRoom,
              idCaller: userId,
              nameCaller: currentRoomName,
              imgCaller: currentRoomAvatar,
              isUseVideo: true,
            })
          );
        }}
      >
        <MissedVideoCallIcon className="chatShow___header_navToolBox_icon" />
      </div>

      <div
        className="chatShow___header_navToolBox_icon_wraper"
        onClick={() => {
          refreshPopupWindow("audioCall");
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
      <Modal
        open={isOpenVideo}
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
            <ModalInComing
              memberCurrenRoom={memberCurrenRoom}
              userId={userId}
              typeCurrentRoom={typeCurrentRoom}
              currentRoomId={currentRoomId}
              userImg={userImg}
              currentRoomAvatar={currentRoomAvatar}
              currentRoomName={currentRoomName}
              setOpenVideo={setOpenVideo}
              setOpenAudio={setOpenAudio}
            />
            {/* {!isReceivingCall && openModal && typeCurrentRoom === "direct" && (
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
            )} */}
          </div>
        </div>
      </Modal>
      <Modal
        open={isOpenAudio}
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
            <ModalInComing
              memberCurrenRoom={memberCurrenRoom}
              userId={userId}
              typeCurrentRoom={typeCurrentRoom}
              currentRoomId={currentRoomId}
              userImg={userImg}
              currentRoomAvatar={currentRoomAvatar}
              currentRoomName={currentRoomName}
              setOpenVideo={setOpenVideo}
              setOpenAudio={setOpenAudio}
            />
            {/* {!isReceivingCall && openModal && typeCurrentRoom === "direct" && (
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
            )} */}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default React.memo(Call);
