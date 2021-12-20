import React, { useState, useEffect, useRef } from "react";
import Peer from "simple-peer";
import queryString from "query-string";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socketAction from "../../../../../redux/action/socket";
import iceServerConfig from "./iceServerConfig";
import _ from "lodash";
import "./VideoCall.css";
import ToolBoxVideo from "./toolBoxVideo.jsx";
import onCloseTab from "../../../../../helper/close-windown";

const Video = (props) => {
  const [loading, setLoading] = useState(true);
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      console.log("vaooooooooooooooooo VIDEOO ========>", stream);
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
        width: props.twoMember ? "100%" : "300px",
        margin: "3px",
        background: "black",
        borderRadius: "5px",
      }}
    />
  );
};

const Audio = (props) => {
  const [loading, setLoading] = useState(true);
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      console.log("vaooooooooooooooooo AUDIO ========>", stream);
      setLoading(false);
      ref.current.srcObject = stream;
    });
    console.log("loadingloading", loading);
  }, [props.peer]);

  return loading ? (
    <div>loading</div>
  ) : (
    <audio
      playsInline
      autoPlay
      ref={ref}
      style={{
        width: props.twoMember ? "100%" : "300px",
        margin: "3px",
        background: "black",
        borderRadius: "5px",
      }}
    />
  );
};

const GroupModalCall = () => {
  if (window.opener && window.opener !== window) {
    console.log("dang mo popupppppppppppp");
    // you are in a popup
  }
  let { room: currentRoomId } = useParams();
  // const currentRoomIdzzzz = useSelector((state) => state.room.currentRoom?._id);
  const userId = useSelector((state) => state.auth.user?._id);
  const { search, pathname } = useLocation();
  const { video: isUseVideo } = queryString.parse(search);

  console.log("------------isUseVideo----------------", isUseVideo);

  // console.log("currentRoomIdzzzz", currentRoomIdzzzz);
  // console.log("currentRoomId", currentRoomId);
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
    dispatch(socketAction.connectSocket());
    window.addEventListener("beforeunload", notifUnload);
    window.addEventListener("unload", cancelSignal);

    navigator.mediaDevices
      // .getUserMedia({ video: true })
      .getUserMedia({ video: isUseVideo === "true" ? true : false, audio: true })
      .then((currentStream) => {
        currentStreamRef.current = currentStream;
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
        // if 1m don't have member accept cancel call.
        timer.current = setTimeout(() => {
          cancelSignal();
          currentStreamRef.current.getTracks().forEach(function (track) {
            if (track.readyState === "live") {
              track.stop();
            }
          });
          dispatch(socketAction.cancelCall()); //remove in redux
          onCloseTab();
        }, 100000);
        //check user call or userAcceptCall
        if (!_.isEmpty(userJoinedSignal) || allUserGroupCall.length) {
          clearTimeout(timer.current);
          timer.current = null;
        }
        console.log("vao join room call", currentRoomId, userId);
        dispatch(socketAction.joinRoomCall({ currentRoomId, userId, isUseVideo: false }));
      })
      .catch((error) => {
        alert("Please turn on camera and mic.");
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

  console.log(" peersRef.current peersRef.current", peersRef.current);
  const renderByType = () => {
    if (isUseVideo === "true") {
      if (peers.length === 1) {
        return <Video peer={peers[0].peer} twoMember={true} />;
      } else {
        return peers.map((userPeer, index) => {
          return <Video key={index} peer={userPeer.peer} />;
        });
      }
    } else {
      if (peers.length === 1) {
        return <Audio peer={peers[0].peer} twoMember={true} />;
      } else {
        return peers.map((userPeer, index) => {
          return <Audio key={index} peer={userPeer.peer} />;
        });
      }
    }
  };

  console.log("peers.lengthpeers.lengthpeers.lengthpeers.length", peers.length);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "red",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
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
          background: "green",
          alignItems: "flex-start",
        }}
      >
        {renderByType()}
        {/* {isUseVideo === "false" ? (
          peers.map((userPeer, index) => {
            return <Audio key={index} peer={userPeer.peer} twoMember={true} />;
          })
        ) : peers.length === 1 ? (
          <Video peer={peers[0].peer} twoMember={true} />
        ) : (
          peers.map((userPeer, index) => {
            return <Video key={index} peer={userPeer.peer} />;
          })
        )} */}
      </div>
      {/* show only video call */}
      {isUseVideo === "true" && (
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "150px",
            background: "black",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            style={{
              width: "100%",
            }}
          />
        </div>
      )}

      <ToolBoxVideo
        currentStreamRef={currentStreamRef}
        connectionRef={peersRef}
        userId={userId}
        currentRoomId={currentRoomId}
      />
    </div>
  );
};

export default React.memo(GroupModalCall);
