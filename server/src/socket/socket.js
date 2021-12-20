import friendSocket from "./friendSocket.js";
import chatSocket from "./chat.js";
import callSocket from "./call.js";
import roomSocket from "./room.js";
import UserModel from "../models/user.js";

//io.sockets.adapter.rooms
// Get chatroom info
//  let room = io.sockets.adapter.rooms.get(roomName)
// room.size
const users = {};

const addUser = (userId, socketId) => {
  !users[userId] ? (users[userId] = [socketId]) : users[userId].push(socketId);
};

const removeUser = (userId, socketId) => {
  users[userId] = users[userId].filter((id) => socketId !== id);
  if (!users[userId].length) {
    delete users[userId];
  }
};

const socketInit = (io) => {
  // // register middleware in Socket.IO
  // io.use((socket, next) => {
  //   sessionMiddleware(socket.request, {}, next);
  // });
  io.on("connection", (socket) => {
    // const session = socket.request.session;
    // console.log("session", session);
    // session.connections++;
    // session.save();
    // var userInSession = socket.request.session.passport.user;
    // console.log("Your User ID is", userInSession);

    const { username: userInSession, _id: userId } = socket.request.user;

    addUser(userId, socket.id);

    console.log("users connected to socket:", users);

    //check don't sent after open new tab
    if (users[userId].length === 1) {
      (async () => {
        try {
          await UserModel.findByIdAndUpdate(userId, { isOnline: true });
          socket.broadcast.emit("RES_USER_ONLINE", userId);
        } catch (error) {
          console.log("set user online error:", error);
        }
      })();
    }

    // friend_chat_call_Socket;
    friendSocket(socket, io, users, userInSession);
    chatSocket(socket, io, users, userInSession);
    callSocket(socket, io, users, userInSession);
    roomSocket(socket, io, users, userInSession);

    //when disconnect
    socket.on("disconnect", () => {
      removeUser(userId, socket.id);
      //check don't sent after open new tab
      if (!users[userId]) {
        (async () => {
          try {
            await UserModel.findByIdAndUpdate(userId, { isOnline: false });
            socket.broadcast.emit("RES_USER_OFFLINE", userId);
          } catch (error) {
            console.log("set user offline error:", error);
          }
        })();
      }
    });
  });
};

export default socketInit;
