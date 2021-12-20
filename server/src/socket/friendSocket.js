import UserModel from "../models/user.js";
import ContactModel from "../models/contact.js";

const addFriendSocket = (socket, io, users, userInSession) => {
  socket.on("req-add-friend", async (data) => {
    try {
      const userWithEmail = await UserModel.findOne({ email: data.email });

      if (!userWithEmail) {
        let err = new Error("Can't find user with email.");
        err.statusCode = 404;
        throw err;
      }
      let infoSender = await UserModel.findOne({ username: userInSession });
      let friend = await ContactModel.create({
        userId: infoSender._id,
        contactId: userWithEmail._id,
        message: data.message,
      });
      //user is friend
      if (users[userWithEmail._id]) {
        users[userWithEmail._id].forEach((id) => {
          io.to(id).emit("res-add-friend", friend);
        });
      }
    } catch (error) {}
  });

  socket.on("req-accept-friend", async (data) => {
    try {
      const contactAccept = await ContactModel.findByIdAndUpdate(data.id, { status: true });
      if (users[contactAccept.userId]) {
        users[contactAccept.userId].forEach((id) => {
          io.to(id).emit("res-accept-friend", contactAccept);
        });
      }
    } catch (error) {}
  });

  socket.on("req-reject-friend", async (data) => {
    console.log("111", data);
    try {
      const frienRemove = await ContactModel.findByIdAndRemove(data.id);
      if (users[frienRemove.userId]) {
        users[frienRemove.userId].forEach((id) => {
          io.to(id).emit("res-reject-friend", frienRemove);
        });
      }
    } catch (error) {}
  });
};

export default addFriendSocket;
