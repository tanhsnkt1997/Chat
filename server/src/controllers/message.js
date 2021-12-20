import mongoose from "mongoose";
import MessageModel from "../models/message.js";
import RoomChatModel from "../models/chatRoom.js";
import UserModel from "../models/user.js";
import uploadFile from "../ultils/uploadAsync.js";
import { find as linkifyFind } from "linkifyjs";
import { uploadMultipleFiles, uploadMultipleVideos } from "../ultils/cloudinary.js";
import metaData from "../ultils/metaData.js";

export const getListMessage = async (req, res) => {
  try {
    const { chatRoomID } = req.params; //room chat id
    const page = +req.query.page;
    const limit = +req.query.limit;
    const message = await MessageModel.find({ chatRoom: chatRoomID })
      // .lean()
      .sort({ createdAt: -1 })
      .skip(page * limit) //start with 0
      .limit(limit)
      .populate("user", "-chatRooms");
    const chatRoomMessage = Array.from(message).reverse();
    //success
    res.json(chatRoomMessage);
  } catch (error) {
    console.log("error getListMessage", error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const creatMessageText = async (req, res) => {
  try {
    const { text, chatRoomId, userId, messageReply } = req.body;
    console.log("parentReply", messageReply);
    if (!text || !chatRoomId || !userId) {
      let err = new Error("body can't empty.");
      err.statusCode = 500;
      throw err;
    }
    //Link
    let arrLink = [];
    linkifyFind(text).forEach((data) => {
      if (data.type === "url") {
        arrLink.push(data);
      }
    });

    let arrDataLink = arrLink.map(async (data, index) => {
      let res = await metaData(data.href);
      return res;
    });

    let promiseLink = await Promise.all(arrDataLink);

    //save message to db
    const messageCreated = await MessageModel.create({
      text: text,
      user: userId,
      chatRoom: chatRoomId,
      messageType: "text",
      link: promiseLink,
      parentReply: messageReply || {},
    });
    //update last message
    let roomChat = await RoomChatModel.findByIdAndUpdate(chatRoomId, {
      lastMessage: messageCreated._id,
    });
    for (let member of roomChat.members) {
      // update unread message if other me
      if (member !== userId) {
        await UserModel.updateOne(
          { _id: member, "chatRooms.data": chatRoomId },
          { $inc: { "chatRooms.$.unReadMessages": 1 } },
          { upsert: true }
        );
      }
    }
    const messageFinal = await MessageModel.findById(messageCreated._id).populate("user", "-chatRooms");
    //success
    res.json(messageFinal);
  } catch (error) {
    console.log("error creatMessageText", error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const creatMessageFile = async (req, res) => {
  try {
    await uploadFile.uploadAsynAnyFile(req, res);
    const { _id } = req.user;
    const { text, chatRoomId } = req.body;
    let fileUploadeds = await uploadMultipleFiles(req.files);

    const messageCreated = await MessageModel.create({
      text: text || "",
      user: _id,
      chatRoom: chatRoomId,
      messageType: text && fileUploadeds.length ? "text-file" : "file",
      file: fileUploadeds,
    });

    let roomChat = await RoomChatModel.findByIdAndUpdate(chatRoomId, {
      lastMessage: messageCreated._id,
    });

    console.log("roomChatroomChatroomChat", roomChat);

    for (let member of roomChat.members) {
      // update unread message if other me
      if (member !== _id) {
        await UserModel.updateOne(
          { _id: member, "chatRooms.data": chatRoomId },
          { $inc: { "chatRooms.$.unReadMessages": 1 } },
          { upsert: true }
        );
      }
    }
    const messageFinal = await MessageModel.findById(messageCreated._id).populate("user", "-chatRooms");
    res.json(messageFinal);
  } catch (error) {
    console.log("error messageFile", error);
    return res.status(500).json({ message: error });
  }
};

export const creatLike = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { type, chatRoomId } = req.body;
    console.log(`req.bodyyyyyyy`, req.body);
    if (type !== "like") {
      return res.status(500).json({ message: "message type don't correct" });
    }
    const messageCreated = await MessageModel.create({
      user: userId,
      chatRoom: chatRoomId,
      messageType: "like",
    });
    //update last message
    let roomChat = await RoomChatModel.findByIdAndUpdate(chatRoomId, {
      lastMessage: messageCreated._id,
    });
    for (let member of roomChat.members) {
      // update unread message if other me
      if (member !== userId) {
        await UserModel.updateOne(
          { _id: member, "chatRooms.data": chatRoomId },
          { $inc: { "chatRooms.$.unReadMessages": 1 } },
          { upsert: true }
        );
      }
    }
    const messageFinal = await MessageModel.findById(messageCreated._id).populate("user", "-chatRooms");
    //success
    res.json(messageFinal);
  } catch (error) {
    console.log("error creatLike", error);
    return res.status(500).json({ message: error });
  }
};

export const creatMessageFileForward = async (req, res) => {
  try {
    const { _id } = req.user;
    const { text, chatRoomId, files, type } = req.body;
    let fileUploadeds = await uploadMultipleFiles(files, type);

    const messageCreated = await MessageModel.create({
      text: text || "",
      user: _id,
      chatRoom: chatRoomId,
      messageType: text && fileUploadeds.length ? "text-file" : "file",
      file: fileUploadeds,
    });

    let roomChat = await RoomChatModel.findByIdAndUpdate(chatRoomId, {
      lastMessage: messageCreated._id,
    });
    for (let member of roomChat.members) {
      // update unread message if other me
      if (member !== _id) {
        await UserModel.updateOne(
          { _id: member, "chatRooms.data": chatRoomId },
          { $inc: { "chatRooms.$.unReadMessages": 1 } },
          { upsert: true }
        );
      }
    }
    const messageFinal = await MessageModel.findById(messageCreated._id).populate("user", "-chatRooms");
    res.json(messageFinal);
  } catch (error) {
    console.log("error creatMessageFileForward", error);
    return res.status(500).json({ message: error });
  }
};

export const creatReaction = async (req, res) => {
  try {
    const { _id } = req.user;
    const listReact = await MessageModel.findById(req.body.messageId, { reaction: 1, _id: 0 }).lean();
    const index = listReact.reaction.findIndex((react) => {
      //covert string compare objectId not working
      return String(react.userId) === String(_id);
    });
    if (req.body.icon === "cancel") {
      listReact.reaction = listReact.reaction.filter((react) => String(react.userId) !== String(_id));
    } else if (index === -1) {
      listReact.reaction.push({ typeReaction: req.body.icon, userId: _id });
    } else if (index >= 0) {
      listReact.reaction[index] = { typeReaction: req.body.icon, userId: _id };
    }
    const messageUpdatedReaction = await MessageModel.findByIdAndUpdate(
      req.body.messageId,
      { reaction: listReact.reaction },
      { new: true, overwrite: false, fields: { reaction: 1, _id: 1, chatRoom: 1 } }
    ).lean();
    res.json(messageUpdatedReaction);
  } catch (error) {
    console.log("error creatReaction", error);
    return res.status(500).json({ message: error });
  }
};
/**
 *
 */
export const removeMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { _id } = req.user;
    //check if message exits and message of me
    const messageFind = await MessageModel.findOne({ _id: messageId, user: _id }, { _id: 1, chatRoom: 1 }).lean();
    if (!messageFind) {
      return res.status(500).json({ message: "Can't find message." });
    }
    await MessageModel.deleteOne({ _id: messageId });
    const lastedMessage = await MessageModel.findOne({ chatRoom: messageFind.chatRoom })
      .sort({
        createdAt: -1,
      })
      .lean();
    await RoomChatModel.updateOne(
      { _id: messageFind.chatRoom },
      {
        lastMessage: lastedMessage._id,
      }
    );

    return res.json({ lastedMessage, messageId, chatRoom: messageFind.chatRoom });
  } catch (error) {
    console.log("error removeMessage:", error);
    res.status(500).json({ message: error });
  }
};

export const getListSearchMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const key = req.query.key;
    const page = +req.query.page;
    const limit = +req.query.limit;
    const messageSearch = await MessageModel.find({ $text: { $search: key }, chatRoom: roomId }, { _id: 1 })
      .lean()
      .sort({ createdAt: -1 });
    const messageReverse = Array.from(messageSearch).reverse();

    return res.json(messageReverse);
  } catch (error) {
    console.log("error getListSearchMessage:", error);
    res.status(500).json({ message: error });
  }
};

export const getDataSearch = async (req, res) => {
  try {
    const { messageId, roomId } = req.params;
    const { type, limit } = req.query;
    let condition = {};
    if (type === "default") {
      condition._id = { $lte: messageId };
      condition.chatRoom = roomId;
    } else if (type === "next") {
      condition._id = { $gte: messageId };
      condition.chatRoom = roomId;
    } else if (type === "prev") {
      condition._id = { $lte: messageId };
      condition.chatRoom = roomId;
    }
    const listMessage = await MessageModel.find(condition)
      .lean()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("user", "-chatRooms");
    res.json({ listMessage });
  } catch (error) {
    console.log("error getDataSearch:", error);
    res.status(500).json({ message: error });
  }
};

export const replyMessage = (req, res) => {};
