import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userChatRoomSchema = mongoose.Schema(
  {
    data: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
    },
    unReadMessages: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

const User = mongoose.Schema(
  {
    username: { type: String, require: true },
    displayName: { type: String, default: "chua co" },
    email: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
    avatar: {
      type: String,
      default: "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png",
    },
    isActive: { type: Boolean, default: false },
    about: { type: String, max: 500, default: "No description about." },
    chatRooms: [userChatRoomSchema],
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
User.index({ displayName: "text" });
User.plugin(passportLocalMongoose);

export default mongoose.model("User", User);
