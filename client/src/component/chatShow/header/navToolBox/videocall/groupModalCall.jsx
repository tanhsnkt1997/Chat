import React, { useState, useEffect, useRef } from "react";
import Peer from "simple-peer";
import { useDispatch, useSelector } from "react-redux";
import socketAction from "../../../../../redux/action/socket";
import iceServerConfig from "./iceServerConfig";
import _ from "lodash";
import "./VideoCall.css";
import ToolBoxVideo from "./toolBoxVideo.jsx";

const Video = (props) => {
  const [loading, setLoading] = useState(true);
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      setLoading(false);
      ref.current.srcObject = stream;
    });
  }, []);

  return loading ? (
    <div>loading</div>
  ) : (
    <video
      playsInline
      autoPlay
      ref={ref}
      style={{
        width: "300px",
        margin: "3px",
        background: "black",
        borderRadius: "5px",
      }}
    />
  );
};

const GroupModalCall = ({ userId, isOpenModal, currentRoomId }) => {
  const [peers, setPeers] = useState([]);

  const peersRef = useRef([]);
  const myVideo = useRef();
  const currentStreamRef = useRef(null);
  const timer = useRef(null); // we can save timer in useRef and pass it to child

  const dispatch = useDispatch();

  const allUserGroupCall = useSelector((state) => state.room.allUserGroupCall);
  const userJoinedSignal = useSelector((state) => state.room.userJoinedSignal);
  const recevingReturnedSignal = useSelector((state) => state.room.recevingReturnedSignal);
  const userLeaveGroupCall = useSelector((state) => state.room.userLeaveGroupCall);

  console.log("allUserGroupCall", allUserGroupCall);
  console.log("userJoinedSignal", userJoinedSignal);
  // console.log("recevingReturnedSignal", recevingReturnedSignal);

  /**
   *B2
   */
  useEffect(() => {
    console.log("allUserGroupCall", allUserGroupCall);
    if (allUserGroupCall.length > 0) {
      const peers = [];
      allUserGroupCall.forEach((userIdSignal) => {
        const peer = createPeer(userIdSignal, userId, currentStreamRef.current);
        peersRef.current.push({
          peerID: userIdSignal,
          peer,
        });
        peers.push({
          peerID: userIdSignal,
          peer,
        });
      });
      setPeers(peers);
    }
  }, [allUserGroupCall.length]);

  /**
   * B3 user joined
   * *userJoinedSignal.callerID : ID me
   */
  useEffect(() => {
    if (!_.isEmpty(userJoinedSignal)) {
      const peer = addPeer(
        userJoinedSignal.signal,
        userJoinedSignal.callerID,
        userJoinedSignal.userToSignal,
        currentStreamRef.current
      );
      peersRef.current.push({
        peerID: userJoinedSignal.callerID,
        peer,
      });

      setPeers((users) => [
        ...users,
        {
          peerID: userJoinedSignal.callerID,
          peer,
        },
      ]);
    }
  }, [userJoinedSignal]);

  /**
   *B4
   */
  useEffect(() => {
    if (!_.isEmpty(recevingReturnedSignal)) {
      // console.log("-----------------------finalyyyyyyyy-------------------------------");
      // console.log("b1:", { recevingReturnedSignal, peerRef: peersRef.current });
      const item = peersRef.current.find((p) => p.peerID === recevingReturnedSignal.id);
      // console.log("b2:", item);
      item.peer.signal(recevingReturnedSignal.signal);
    }
  }, [recevingReturnedSignal]);

  /**
   *B5 fileter user leave
   */
  useEffect(() => {
    if (!_.isEmpty(userLeaveGroupCall)) {
      //destroy user peer leave
      const item = peersRef.current.find((p) => p.peerID === userLeaveGroupCall.userIdLeave);
      item.peer.destroy();
      //filter current PeerRef
      peersRef.current = peersRef.current.filter(
        (p) => p.peerID !== userLeaveGroupCall.userIdLeave
      );
      //filter list peer render
      setPeers((userPeers) =>
        userPeers.filter((userPeer) => userPeer.peerID !== userLeaveGroupCall.userIdLeave)
      );
    }
  }, [userLeaveGroupCall]);

  /**
   * B1
   */

  useEffect(() => {
    window.addEventListener("beforeunload", notifUnload);
    window.addEventListener("unload", cancelSignal);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        currentStreamRef.current = currentStream;
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
        //if 1m don't have member accept cancel call.
        timer.current = setTimeout(() => {
          cancelSignal();
          currentStreamRef.current.getTracks().forEach(function (track) {
            if (track.readyState === "live") {
              track.stop();
              isOpenModal(false); //callback turn off video modal
              dispatch(socketAction.cancelCall()); //remove in redux
            }
          });
        }, 100000);
        if (!_.isEmpty(userJoinedSignal)) {
          clearTimeout(timer.current);
          timer.current = null;
        }
        dispatch(socketAction.joinRoomCall({ currentRoomId, userId }));
      })
      .catch((error) => {
        console.log("navigator.mediaDevices.getUserMedia error:", error);
      });
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      window.removeEventListener("beforeunload", notifUnload);
      window.removeEventListener("unload", cancelSignal);
      cancelSignal();
    };
  }, []);

  const notifUnload = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const cancelSignal = () => {
    dispatch(socketAction.cancelSignalGroupCall({ userIdLeave: userId, currentRoomId }));
  };

  function createPeer(userToSignal, callerID, stream) {
    // console.log("vao creat peer:");
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: iceServerConfig,
      },
      stream: stream,
    });

    peer.on("signal", (signal) => {
      dispatch(socketAction.sendingSignalGroupCall({ userToSignal, callerID, signal }));
    });
    return peer;
  }

  const addPeer = (incomingSignal, callerID, userToSignal, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    peer.on("signal", (signal) => {
      dispatch(socketAction.returnSignalGroupCall({ signal, callerID, userToSignal }));
    });

    peer.signal(incomingSignal);
    return peer;
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {peers.length === 0 && (
        <div style={{ margin: "20px", textAlign: "center" }}>
          <h3>Đang đợi thành viên tham gia...</h3>
        </div>
      )}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          flex: 1,
        }}
      >
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          style={{ width: "300px", borderRadius: "5px", margin: "3px" }}
        />

        {peers.map((userPeer, index) => {
          return <Video key={index} peer={userPeer.peer} />;
        })}
      </div>
      <ToolBoxVideo
        currentStreamRef={currentStreamRef}
        connectionRef={peersRef}
        isOpenModal={isOpenModal}
        userId={userId}
        currentRoomId={currentRoomId}
      />
    </div>
  );
};

export default React.memo(GroupModalCall);
