import mongoose from "mongoose";

const ChatRoom = mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    chatIcon: {
      type: String,
      default:
        "https://raw.githubusercontent.com/jovanidash21/chat-app/master/public/images/default-chat-icon.jpg",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    chatType: {
      type: String,
      enum: ["private", "direct", "group", "public"],
      default: "group",
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

ChatRoom.index({ name: "text" });

export default mongoose.model("ChatRoom", ChatRoom);
