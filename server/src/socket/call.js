const userAcceptGroupCall = {};

const call = (socket, io, listUserConnect, userInSession) => {
  /**
   * sent signal to partnera
   */
  socket.on("REQ_CALL_USER", (data, callback) => {
    try {
      const userFilter = data.userToCall.filter((item) => item._id !== data.from);
      //test
      const member = userFilter[0];
      if (listUserConnect[member._id]) {
        listUserConnect[member._id].forEach((socketId) => {
          io.to(socketId).emit("RES_CALL_USER", { signal: data.signalData, from: data.from });
        });
      }
    } catch (error) {
      console.log("error REQ_CALL_USER", error);
    }
  });

  /**
   * accept call
   */

  socket.on("REQ_ACCEPT_CALL_USER", (data, callback) => {
    try {
      console.log("REQ_ACCEPT_CALL_USER", data);
      if (listUserConnect[data.to]) {
        listUserConnect[data.to].forEach((socketId) => {
          io.to(socketId).emit("RES_CALL_ACCEPTED", { signal: data.signal });
        });
      }
    } catch (error) {
      console.log("error REQ_ACCEPT_CALL_USER", error);
    }
  });

  /**
   * groupCall after user click button call
   */
  socket.on("REQ_GROUP_START_CALL", (data, callback) => {
    try {
      const userFilter = data.memberGroup.filter((item) => item._id !== data.idCaller);
      for (let member of userFilter) {
        //check if user is online and user in the room => online in room
        if (listUserConnect[member._id]) {
          listUserConnect[member._id].forEach((socketId) => {
            io.to(socketId).emit("RES_START_GROUP_CALL", {
              nameCaller: data.nameCaller,
              imgCaller: data.imgCaller,
              isUseVideo: data.isUseVideo,
              idCaller: data.idCaller,
            });
          });
        }
      }
    } catch (error) {
      console.log("error REQ_GROUP_START_CALL", error);
    }
  });

  socket.on("REQ_JOIN_ROOM_CALL", (data, callback) => {
    console.log("nhan dc join room call", data);
    try {
      //save userId Accept call group chat
      if (userAcceptGroupCall[data.currentRoomId]) {
        userAcceptGroupCall[data.currentRoomId].push(data.userId);
      } else {
        userAcceptGroupCall[data.currentRoomId] = [data.userId];
      }
      //filter list outer me
      const userInThisRoom = userAcceptGroupCall[data.currentRoomId].filter(
        (id) => id !== data.userId
      );
      console.log("userAcceptGroupCall", userAcceptGroupCall);
      console.log("userInThisRoom", userInThisRoom);

      socket.emit("RES_ALL_USER_GROUP_CALL", userInThisRoom);
    } catch (error) {
      console.log("error REQ_JOIN_ROOM_CALL", error);
    }

    // for (let memberId of userInThisRoom) {
    //   //check if user is online and user in the room => online in room
    //   if (listUserConnect[memberId]) {
    //     listUserConnect[memberId].forEach((socketId) => {
    //       // console.log("socketId", socketId);
    //       io.to(socketId).emit("RES_ALL_USER_GROUP_CALL", userInThisRoom);
    //     });
    //   }
    // }
  });

  socket.on("REQ_SENDING_SIGNAL_GROUP_CALL", (data, callback) => {
    try {
      // console.log("REQ_SENDING_SIGNAL_GROUP_CALL", {
      //   userToSignal: data.userToSignal,
      //   callerID: data.callerID,
      // });
      if (listUserConnect[data.userToSignal]) {
        listUserConnect[data.userToSignal].forEach((socketId) => {
          io.to(socketId).emit("RES_USER_JOINED_GROUP_CALL", {
            signal: data.signal,
            callerID: data.callerID,
            userToSignal: data.userToSignal,
          });
        });
      }
    } catch (error) {
      console.log("error REQ_SENDING_SIGNAL_GROUP_CALL", error);
    }
  });

  socket.on("REQ_RETURNING_SIGNAL_GROUP_CALL", (data, callback) => {
    try {
      console.log("REQ_RETURNING_SIGNAL_GROUP_CALL", {
        userToSignal: data.userToSignal,
        callerID: data.callerID,
      });
      if (listUserConnect[data.callerID]) {
        listUserConnect[data.callerID].forEach((socketId) => {
          io.to(socketId).emit("RES_RECEIVING_RETURNED_SIGNAL_GROUP_CALL", {
            signal: data.signal,
            id: data.userToSignal,
          });
        });
      }
    } catch (error) {
      console.log("error REQ_RETURNING_SIGNAL_GROUP_CALL", error);
    }
  });

  socket.on("REQ_CANCEL_SIGNAL_GROUP_CALL", (data, callback) => {
    try {
      if (userAcceptGroupCall[data.currentRoomId]?.length) {
        userAcceptGroupCall[data.currentRoomId] = userAcceptGroupCall[data.currentRoomId].filter(
          (id) => id !== data.userIdLeave
        );
        if (!userAcceptGroupCall[data.currentRoomId].length) {
          delete userAcceptGroupCall[data.currentRoomId];
        }
        //emit to all member room by list filter
        if (userAcceptGroupCall[data.currentRoomId]?.length) {
          for (let memberId of userAcceptGroupCall[data.currentRoomId]) {
            console.log("memberIdmemberId", memberId);
            //check if user is online and user in the room => online in room
            if (listUserConnect[memberId]) {
              listUserConnect[memberId].forEach((socketId) => {
                io.to(socketId).emit("RES_CANCEL_SIGNAL_GROUP_CALL", {
                  userIdLeave: data.userIdLeave,
                });
              });
            }
          }
        }
      }
    } catch (error) {
      console.log("error REQ_CANCEL_SIGNAL_GROUP_CALL", error);
    }
  });

  socket.on("REQ_REJECT_CALL", (data, callback) => {
    try {
      if (listUserConnect[data.idCaller]) {
        listUserConnect[data.idCaller].forEach((socketId) => {
          io.to(socketId).emit("RES_REJECT_CALL", {
            status: "reject",
          });
        });
      }
    } catch (error) {
      console.log("error REQ_REJECT_CALL", error);
    }
  });
};

export default call;
