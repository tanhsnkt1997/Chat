import RoomModel from "../models/chatRoom.js";

const roomSocket = (socket, io, listUserConnect, userInSession) => {
  /**
   * infoChange({groupId, name})
   */
  socket.on("CHANGE_NAME_GROUP", async (infoChange, callback) => {
    try {
      const listMember = await RoomModel.findById(infoChange.roomId, "members").populate("members", "_id");
      for (let member of listMember.members) {
        //check if user is online and user in the room => online in room
        if (listUserConnect[member._id]) {
          listUserConnect[member._id].forEach(async (socketId) => {
            //user online
            io.to(socketId).emit("RES_CHANGE_NAME_GROUP", infoChange);
          });
        } else {
          //sent notif
        }
      }
    } catch (error) {
      console.log("error creat chat channel", error);
    }
  });
  socket.on("CHANGE_AVATAR_GROUP", async (infoChange, callback) => {
    try {
      const listMember = await RoomModel.findById(infoChange.roomId, "members").populate("members", "_id");
      for (let member of listMember.members) {
        //check if user is online and user in the room => online in room
        if (listUserConnect[member._id]) {
          listUserConnect[member._id].forEach(async (socketId) => {
            //user online
            io.to(socketId).emit("RES_CHANGE_AVATAR_GROUP", infoChange);
          });
        } else {
          //sent notif
        }
      }
    } catch (error) {
      console.log("error creat chat channel", error);
    }
  });
  socket.on("LEAVE_GROUP", async (infoChange, callback) => {
    let room = io.sockets.adapter.rooms.get(infoChange.groupId); //chatRoom is roomChatId from messsage model
    const listMember = await RoomModel.findById(infoChange.groupId, "members").lean().populate("members", "_id");
    for (let member of listMember.members) {
      //check if user is online and user in the room => online in room
      if (listUserConnect[member._id]) {
        listUserConnect[member._id].forEach(async (socketId) => {
          //user online
          if (room.has(socketId)) {
            io.to(socketId).emit("RES_LEAVE_GROUP", infoChange);
          } else {
            //sent notif and don;t set unread eq 0
          }
        });
      }
    }
  });
};
export default roomSocket;
