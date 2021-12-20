import mongoose from "mongoose";

const Message = mongoose.Schema(
  {
    parentReply: { type: Object, default: {} },
    text: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
    },
    messageType: {
      type: String,
      enum: ["text", "file", "image", "audio", "text-file", "notification", "link", "like"],
      default: "text",
    },
    link: [
      {
        title: String,
        image: String,
        description: String,
        url: String,
      },
    ],
    file: [
      {
        url: String,
        resource_type: String,
        format: String,
        thumb: { type: String, default: "" },
        fileName: String,
        fileSize: Number,
        mimetype: String,
        public_id: String,
        createdAt: { type: String, default: Date.now() },
      },
    ],
    reaction: [{ typeReaction: String, userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

Message.index({ text: "text" });

export default mongoose.model("Message", Message);
