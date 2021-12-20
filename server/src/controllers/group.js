import chatRoomModel from "../models/chatRoom.js";
import UserModel from "../models/user.js";
import ContactModel from "../models/contact.js";
import MessageModel from "../models/message.js";
import mongoose from "mongoose";
import uploadFile from "../ultils/uploadAsync.js";
import { uploadAvtar } from "../ultils/cloudinary.js";

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const getListGroup = async (req, res) => {
  try {
    const { _id } = req.user;

    const page = +req.query.page;
    const limit = +req.query.limit;

    const test1 = await UserModel.aggregate([
      { $match: { _id: _id } },
      { $project: { _id: 1, chatRooms: 1 } },
      {
        $facet: {
          totalCount: [
            {
              // $count: "$chatRooms",
              $project: { _id: 0, count: { $size: "$chatRooms" } },
            },
          ],
          data: [
            { $unwind: { path: "$chatRooms" } },
            {
              $lookup: {
                from: "chatrooms",
                let: { chatRoomId: "$chatRooms.data" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [{ $eq: ["$$chatRoomId", "$_id"] }, { $eq: ["group", "$chatType"] }],
                      },
                    },
                  },
                ],
                // localField: "chatRooms.data",
                // foreignField: "_id",
                as: "chatRooms.data",
              },
            },

            {
              $project: {
                chatRooms: { unReadMessages: 1, data: { $arrayElemAt: ["$chatRooms.data", 0] } },
              },
            },
            {
              $lookup: {
                from: "messages",
                localField: "chatRooms.data.lastMessage",
                foreignField: "_id",
                as: "chatRooms.data.lastMessage",
              },
            },

            { $unwind: { path: "$chatRooms.data.members" } },
            {
              $lookup: {
                from: "users",
                let: { memberChatRoomId: "$chatRooms.data.members" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$$memberChatRoomId", "$_id"],
                      },
                    },
                  },
                  { $project: { hash: 0, salt: 0 } },
                ],
                as: "chatRooms.data.members",
              },
            },

            {
              $group: {
                _id: "$chatRooms.data._id",
                chatIcon: { $first: "$chatRooms.data.chatIcon" },
                chatType: { $first: "$chatRooms.data.chatType" },
                createdAt: { $first: "$chatRooms.data.createdAt" },
                lastMessage: { $first: { $arrayElemAt: ["$chatRooms.data.lastMessage", 0] } },
                name: { $first: "$chatRooms.data.name" },
                updatedAt: { $first: "$chatRooms.data.updatedAt" },
                members: { $addToSet: { $arrayElemAt: ["$chatRooms.data.members", 0] } },
                unreadMessage: { $first: "$chatRooms.unReadMessages" },
              },
            },

            {
              $project: {
                _id: 1,
                chatType: 1,
                members: 1,
                unreadMessage: 1,
                lastMessage: 1,
                name: {
                  $cond: {
                    if: {
                      $eq: ["$chatType", "direct"],
                    },
                    then: {
                      $cond: {
                        if: {
                          $eq: [{ $arrayElemAt: ["$members._id", 0] }, mongoose.Types.ObjectId(_id)],
                        },
                        then: { $arrayElemAt: ["$members.displayName", 1] },
                        else: { $arrayElemAt: ["$members.displayName", 0] },
                      },
                    },
                    else: "$name",
                  },
                },
                chatIcon: {
                  $cond: {
                    if: {
                      $eq: ["$chatType", "direct"],
                    },
                    then: {
                      $cond: {
                        if: {
                          $eq: [{ $arrayElemAt: ["$members._id", 0] }, mongoose.Types.ObjectId(_id)],
                        },
                        then: { $arrayElemAt: ["$members.avatar", 1] },
                        else: { $arrayElemAt: ["$members.avatar", 0] },
                      },
                    },
                    else: "$chatIcon",
                  },
                },
                createdAt: 1,
                updatedAt: 1,
              },
            },
            { $sort: { updatedAt: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
          ],
        },
      },
    ]);

    const finalData = {
      totalCount: test1[0].totalCount[0].count,
      data: test1[0].data,
    };

    res.json(finalData);
  } catch (error) {
    console.log("error getListGroup", error);
    res.status(500).json({ message: error });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getListSearch = async (req, res) => {
  try {
    const { _id } = req.user;
    const key = req.query.key;
    const page = +req.query.page;
    const limit = +req.query.limit;
    console.log("key search in GROUP", key, page, limit);

    // const search = await ChatRoom.find({
    //   $text: { $search: `\"${key.trim()}\"` },
    // });

    const test1 = await UserModel.aggregate([
      { $match: { _id: _id } },
      { $project: { _id: 1, chatRooms: 1 } },

      { $unwind: { path: "$chatRooms" } },
      {
        $lookup: {
          from: "chatrooms",
          // localField: "chatRooms.data",
          // foreignField: "_id",
          let: { chatRoomId: "$chatRooms.data" },
          as: "chatRooms.data",
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$$chatRoomId", "$_id"] }, { $eq: ["group", "$chatType"] }],
                },
                $text: { $search: key.trim() },
              },
            },
          ],
        },
      },

      {
        $facet: {
          totalCount: [
            {
              // $count: "count",
              $project: { _id: 0, count: { $size: "$chatRooms.data" } },
            },
          ],
          data: [
            {
              $project: {
                chatRooms: { unReadMessages: 1, data: { $arrayElemAt: ["$chatRooms.data", 0] } },
              },
            },
            {
              $lookup: {
                from: "messages",
                localField: "chatRooms.data.lastMessage",
                foreignField: "_id",
                as: "chatRooms.data.lastMessage",
              },
            },

            { $unwind: { path: "$chatRooms.data.members" } },
            {
              $lookup: {
                from: "users",
                let: { memberChatRoomId: "$chatRooms.data.members" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$$memberChatRoomId", "$_id"],
                      },
                    },
                  },
                  { $project: { hash: 0, salt: 0 } },
                ],
                as: "chatRooms.data.members",
              },
            },

            {
              $group: {
                _id: "$chatRooms.data._id",
                chatIcon: { $first: "$chatRooms.data.chatIcon" },
                chatType: { $first: "$chatRooms.data.chatType" },
                createdAt: { $first: "$chatRooms.data.createdAt" },
                lastMessage: { $first: { $arrayElemAt: ["$chatRooms.data.lastMessage", 0] } },
                name: { $first: "$chatRooms.data.name" },
                updatedAt: { $first: "$chatRooms.data.updatedAt" },
                members: { $addToSet: { $arrayElemAt: ["$chatRooms.data.members", 0] } },
                unreadMessage: { $first: "$chatRooms.unReadMessages" },
              },
            },

            {
              $project: {
                _id: 1,
                chatType: 1,
                members: 1,
                unreadMessage: 1,
                lastMessage: 1,
                name: {
                  $cond: {
                    if: {
                      $eq: ["$chatType", "direct"],
                    },
                    then: {
                      $cond: {
                        if: {
                          $eq: [{ $arrayElemAt: ["$members._id", 0] }, mongoose.Types.ObjectId(_id)],
                        },
                        then: { $arrayElemAt: ["$members.displayName", 1] },
                        else: { $arrayElemAt: ["$members.displayName", 0] },
                      },
                    },
                    else: "$name",
                  },
                },
                chatIcon: {
                  $cond: {
                    if: {
                      $eq: ["$chatType", "direct"],
                    },
                    then: {
                      $cond: {
                        if: {
                          $eq: [{ $arrayElemAt: ["$members._id", 0] }, mongoose.Types.ObjectId(_id)],
                        },
                        then: { $arrayElemAt: ["$members.avatar", 1] },
                        else: { $arrayElemAt: ["$members.avatar", 0] },
                      },
                    },
                    else: "$chatIcon",
                  },
                },
                createdAt: 1,
                updatedAt: 1,
              },
            },

            { $sort: { updatedAt: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
          ],
        },
      },
      {
        $project: {
          totalCount: { $sum: "$totalCount.count" },
          data: 1,
        },
      },
    ]);

    const finalData = {
      totalCount: test1[0].totalCount,
      data: test1[0].data,
    };

    res.json(finalData);
  } catch (error) {
    console.log("getListSearch room chat error", error);
    res.status(500).json({ message: error });
  }
};

//SETING
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const changeName = async (req, res) => {
  try {
    const { displayName } = req.user;
    const { name, roomId } = req.body;
    const groupChat = await chatRoomModel.findById(roomId, { _id: 1, chatType: 1 }).lean();
    if (groupChat.chatType !== "group") {
      return res.status(500).json("change name only apply to group chat.");
    }
    await chatRoomModel.updateOne({ _id: roomId }, { name });
    //xem xet dung promise.all
    //creat message notif
    let messageNotif = await MessageModel.create({
      messageType: "notification",
      text: `${displayName} has change name group is ${name}.`,
      chatRoom: roomId,
    });
    res.json({ name, roomId, messageNotif });
  } catch (error) {
    console.log("changeName group chat error", error);
    res.status(500).json({ message: error });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const changeAvatar = async (req, res) => {
  try {
    const { displayName } = req.user;
    await uploadFile.uploadAsyncOneFile(req, res);
    let avatarUploaded = await uploadAvtar(req.file);
    const { roomId } = req.body;
    const groupChat = await chatRoomModel.findById(roomId, { _id: 1, chatType: 1 }).lean();
    if (groupChat.chatType !== "group") {
      return res.status(500).json("change name only apply to group chat.");
    }
    await chatRoomModel.updateOne({ _id: roomId }, { chatIcon: avatarUploaded.url });
    //xem xet dung promise.all
    //creat message notif
    let messageNotif = await MessageModel.create({
      messageType: "notification",
      text: `${displayName} has change avatar group.`,
      chatRoom: roomId,
    });
    res.json({ avatar: avatarUploaded.url, roomId, messageNotif });
  } catch (error) {
    console.log("changeName group chat error", error);
    res.status(500).json({ message: error });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
export const getListContactOuterRoom = async (req, res) => {
  try {
    const { _id } = req.user;
    let currentRoom = await chatRoomModel.findById(req.params.id, "members").lean();
    let contatcs = await ContactModel.find({
      $or: [
        {
          $and: [{ userId: _id }, { contactId: { $nin: currentRoom.members } }],
        },
        {
          $and: [{ contactId: _id }, { userId: { $nin: currentRoom.members } }],
        },
      ],
    }).lean();

    const listContactUpdated = contatcs.map(async (contact) => {
      // contact = contact.toObject(); because .lean => json not mogo object model
      if (contact.userId === _id) {
        let user = await UserModel.findById(contact.contactId);
        contact.contactName = user.displayName;
        contact.contactAvatar = user.avatar;
      } else {
        let user = await UserModel.findById(contact.userId);
        contact.contactName = user.displayName;
        contact.contactAvatar = user.avatar;
      }
      return contact;
    });
    const listContactUpdatedPromise = await Promise.all(listContactUpdated);
    res.json(listContactUpdatedPromise);
  } catch (error) {
    console.log("error getListContactOuterRoom", error);
    res.status(500).json({ message: error });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const addContactToRoom = async (req, res) => {
  try {
    const { groupId, members } = req.body;
    let listMemberExits = await chatRoomModel
      .findOne({ _id: groupId }, { _id: 0, members: { $elemMatch: { $in: members } } })
      .lean();

    console.log("listMemberExitslistMemberExits", listMemberExits);
    if (members.length === 0 || !groupId) {
      return res.status(500).json({ message: "error add member to group." });
    }
    if (listMemberExits?.members?.length > 0) {
      return res.status(500).json({ message: "member is exits" });
    }

    let roomUpdate = await chatRoomModel
      .findByIdAndUpdate(groupId, { $push: { members: { $each: members } } }, { new: true })
      .populate("members", "-chatRooms")
      .lean();

    let updateUserAndCreatMessageNotif = members.map(async (member) => {
      let userUpdated = await UserModel.findByIdAndUpdate(
        member,
        { $push: { chatRooms: { data: roomUpdate._id } } },
        { upsert: true }
      );
      await MessageModel.updateMany(
        { chatRoom: groupId, user: member, isDelete: true }, //upde only is delete = true
        { isDelete: false },
        { upsert: true }
      );
      //creat message notif
      let messageNotif = await MessageModel.create({
        messageType: "notification",
        text: `${userUpdated.displayName} join the room`,
        chatRoom: roomUpdate._id,
      });
      return messageNotif;
    });
    //2 step
    //-list member add new: add new list
    //-old list member: update outer room, list

    const updatedUserAndCreatMessageNotif = await Promise.all(updateUserAndCreatMessageNotif);
    console.log("updateUserAndCreatMessageNotif:==========>", updatedUserAndCreatMessageNotif);

    res.json({ roomUpdate, memberAdded: members, messageNotification: updatedUserAndCreatMessageNotif });
  } catch (error) {
    console.log("error addContactToRoom", error);
    res.status(500).json({ message: error });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const leaveRoom = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { _id, displayName } = req.user;
    const roomById = await chatRoomModel.findById(groupId, { _id: 1, chatType: 1, members: 1 });
    if (roomById.chatType !== "group") {
      return res.status(500).json("change name only apply to group chat.");
    }
    const memberFilter = roomById.members.filter((member) => String(member) !== String(_id));
    //use promise.all run all task
    const result = await Promise.all([
      chatRoomModel.updateOne({ _id: groupId }, { members: memberFilter }),
      UserModel.updateOne({ _id }, { $pull: { chatRooms: { data: groupId } } }, { upsert: true }),
      MessageModel.updateMany({ chatRoom: groupId, user: _id }, { isDelete: true }, { upsert: true }),
      MessageModel.create({
        messageType: "notification",
        text: `${displayName} has leave group.`,
        chatRoom: groupId,
      }),
    ]);

    console.log("resultttttttttt", result);

    console.log("memberFilter", memberFilter);
    console.log("========leaveRoom=========", _id);
    res.json({ userId: _id, groupId, messageNotifCreat: result[3] });
  } catch (error) {
    console.log("error leaveRoom:", error);
    res.status(500).json({ message: error });
  }
};
