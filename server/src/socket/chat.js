import RoomModel from "../models/chatRoom.js";
import UserModel from "../models/user.js";

const chatSocket = (socket, io, listUserConnect, userInSession) => {
  socket.on("CREAT_ROOM_CHAT", (roomChat, callback) => {
    try {
      //romId is useId online
      for (let member of roomChat.data.members) {
        //check if user don't connect socket
        if (listUserConnect[member._id]) {
          listUserConnect[member._id].forEach(async (socketId) => {
            io.to(socketId).emit("RES_CREAT_ROOM_CHAT", roomChat);
          });
        } else {
          //creat notif
        }
      }
    } catch (error) {
      console.log("error creat chat channel", error);
    }
  });

  /**
   * JOIN ROOM
   */
  socket.on("JOIN_ROOM_CHAT", async ({ chatRoomId, userId, unreadMessage }, callback) => {
    console.log("unreadMessage", unreadMessage);
    if (unreadMessage > 0) {
      await UserModel.updateOne(
        { _id: userId, "chatRooms.data": chatRoomId },
        { $set: { "chatRooms.$.unReadMessages": 0 } },
        { upsert: true }
      );
    }

    socket.join(chatRoomId);
  });

  socket.on("ADD_MEMBER_TO_GROUP", (groupUpdated, callback) => {
    let room = io.sockets.adapter.rooms.get(groupUpdated.roomUpdate._id);
    for (let member of groupUpdated.roomUpdate.members) {
      //check if user is online and user in the room => online in room
      if (listUserConnect[member._id]) {
        listUserConnect[member._id].forEach((socketId) => {
          //user online
          if (room.has(socketId)) {
            io.to(socketId).emit("RES_ADD_MEMBER_TO_GROUP", groupUpdated);
          } else {
            //sent notif chua lam
            // io.to(socketId).emit("RES_ADD_MEMBER_TO_GROUP", message);
          }
        });
      }
    }
  });

  /**
   * SENT-MESSAGE
   */
  socket.on("SENT_MESSAGE", async (message, callback) => {
    try {
      let room = io.sockets.adapter.rooms.get(message.chatRoom);
      const listMember = await RoomModel.findById(message.chatRoom, "members").populate("members", "_id");

      for (let member of listMember.members) {
        //check if user is online and user in the room => online in room
        if (listUserConnect[member._id]) {
          listUserConnect[member._id].forEach(async (socketId) => {
            //user online
            if (room.has(socketId)) {
              await UserModel.updateOne(
                { _id: member._id, "chatRooms.data": message.chatRoom },
                { $set: { "chatRooms.$.unReadMessages": 0 } },
                { upsert: true }
              );
              io.to(socketId).emit("RES_SENT_MESSAGE", message);
            } else {
              //sent notif and don't set unread eq 0
              io.to(socketId).emit("RES_NOTIF_SENT_MESSAGE", { roomId: message.chatRoom, message });
            }
          });
        }
      }
    } catch (error) {
      console.log("error sent message", error);
    }
  });
  /**
   * REACTION
   */
  socket.on("SENT_REACTION_CREATED", async (dataReaction, callback) => {
    try {
      let room = io.sockets.adapter.rooms.get(dataReaction.chatRoom); //chatRoom is roomChatId from messsage model
      const listMember = await RoomModel.findById(dataReaction.chatRoom, "members").populate("members", "_id");
      for (let member of listMember.members) {
        //check if user is online and user in the room => online in room
        if (listUserConnect[member._id]) {
          listUserConnect[member._id].forEach(async (socketId) => {
            //user online
            if (room.has(socketId)) {
              io.to(socketId).emit("RES_SENT_REACTION_CREATED", {
                _id: dataReaction._id,
                reaction: dataReaction.reaction,
              });
            } else {
              //sent notif and don;t set unread eq 0
            }
          });
        }
      }
    } catch (error) {
      console.log("SENT_REACTION_CREATED error:", error);
    }
  });

  /**
   *
   */
  socket.on("REMOVE_MESSAGE", async (dataRemove, callback) => {
    try {
      let room = io.sockets.adapter.rooms.get(dataRemove.chatRoom); //chatRoom is roomChatId from messsage model
      const listMember = await RoomModel.findById(dataRemove.chatRoom, "members").populate("members", "_id");
      for (let member of listMember.members) {
        //check if user is online and user in the room => online in room
        if (listUserConnect[member._id]) {
          listUserConnect[member._id].forEach(async (socketId) => {
            //user online
            if (room.has(socketId)) {
              io.to(socketId).emit("RES_REMOVE_MESSAGE", dataRemove);
            } else {
              //sent notif and don;t set unread eq 0
            }
          });
        }
      }
    } catch (error) {
      console.log("SENT_REACTION_CREATED error:", error);
    }
  });
};
export default chatSocket;
