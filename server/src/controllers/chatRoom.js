import mongoose from "mongoose";
import ChatRoom from "../models/chatRoom.js";
import MessageModel from "../models/message.js";
import User from "../models/user.js";
import ContactModel from "../models/contact.js";

// preserveNullAndEmptyArrays: true
export const getList = async (req, res) => {
  try {
    const { _id } = req.user;
    const page = +req.query.page;
    const limit = +req.query.limit;
    console.log("nhan dc page load all chat:", page, limit);
    const test1 = await User.aggregate([
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
                localField: "chatRooms.data",
                foreignField: "_id",
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

    // console.log("finalData", finalData.data);

    //success
    res.json(finalData);
  } catch (error) {
    console.log("get list room chat error", error);
    return res.status(error.statusCode || 500).json({ message: error.message });
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
    console.log("key search", key, page, limit);

    // const search = await ChatRoom.find({
    //   $text: { $search: `\"${key.trim()}\"` },
    // });

    const test1 = await User.aggregate([
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
                  $eq: ["$$chatRoomId", "$_id"],
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
  }
};

/**
 * Creat ROOM CHAT
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const creat = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { name, members, chatType } = req.body;
    if (chatType === "group") {
      members.push(String(userId));
    }
    //direct
    if (chatType === "direct" && members.length !== 2) {
      let err = new Error("Please select 2 members.");
      err.statusCode = 400;
      throw err;
    }
    if (chatType === "group" && members.length < 3) {
      let err = new Error("Please select at least 3 members.");
      err.statusCode = 400;
      throw err;
    }

    const roomDriectExits = await ChatRoom.findOne({
      members: { $all: members },
      chatType: "direct",
    }).populate("members", "-chatRooms"); //if exits return null
    //if room exits response data room.
    if (roomDriectExits) {
      for (let member of roomDriectExits.members) {
        if (roomDriectExits.chatType === "direct") {
          // userId is userId
          if (member._id !== userId) {
            roomDriectExits.name = member.displayName;
            roomDriectExits.chatIcon = member.avatar;
          }
        }
      }
      let err = new Error("Chat room already exist.");
      err.statusCode = 409;
      err.roomExits = roomDriectExits;
      throw err;
    }

    const chatRoomCreat = await ChatRoom.create({
      name: name,
      chatType,
      members,
      lastMessage: null,
    });

    //loop members and push it.
    for (let member of members) {
      // Nếu upsert = true thì nó sẽ thêm mới bản ghi đó nếu không có bản ghi nào khớp với filter và sẽ không có điều gì xảy ra nếu upsert = false. Mặc định thì upsert = false.
      //.exec() returns a Promise
      User.findByIdAndUpdate(member, { $push: { chatRooms: { data: chatRoomCreat._id } } }, { upsert: true }).exec();
    }

    const chatRoomCreated = await ChatRoom.findById(chatRoomCreat._id).populate("members", "-chatRooms");
    for (let member of chatRoomCreated.members) {
      if (chatRoomCreated.chatType === "direct") {
        // userId is userId
        if (member._id !== id) {
          chatRoomCreated.name = member.displayName;
          chatRoomCreated.chatIcon = member.avatar;
        }
      }
    }

    res.json({
      unReadMessages: 0,
      data: chatRoomCreated,
    });
  } catch (error) {
    console.log("creat room chat error", error);
    return res.status(error.statusCode || 500).json({ message: error.message, roomExits: error.roomExits || null });
  }
};

export const getListImg = async (req, res) => {
  try {
    const page = +req.query.page;
    const limit = +req.query.limit;

    // const messageImg = await MessageModel.find({ chatRoom: req.params.id, messageType: { $in: ["file", "text-file"] }, file: { $elemMatch: { resource_type: "image" } } }, { file: 1, user: 0, _id: 0 })
    // const messageImg = await MessageModel.find({ chatRoom: req.params.id, messageType: { $in: ["file", "text-file"] }, "file.resource_type": "image" }, { file: 1, _id: 0 })
    //   .sort({ createdAt: -1 })
    //   .skip(page * limit) //start with 0
    //   .limit(limit);

    const messageImg = await MessageModel.aggregate([
      {
        $match: {
          chatRoom: mongoose.Types.ObjectId(req.params.id),
          messageType: { $in: ["file", "text-file"] },
        },
      },
      { $unwind: "$file" },
      { $match: { "file.resource_type": "image" } },
      { $project: { _id: 0, file: 1 } },
      { $sort: { createdAt: -1 } },
      { $skip: page * limit },
      { $limit: limit },
    ]);
    const messImgMerge = messageImg.reduce((acc, curr, index, arr) => {
      acc = [...acc, curr.file];
      return acc;
    }, []);
    res.json(messImgMerge);
  } catch (error) {
    console.log("error getListImg", error);
  }
};

export const getListVideoAudio = async (req, res) => {
  try {
    const page = +req.query.page;
    const limit = +req.query.limit;
    const messageVideoAudio = await MessageModel.aggregate([
      {
        $match: {
          chatRoom: mongoose.Types.ObjectId(req.params.id),
          messageType: { $in: ["file", "text-file"] },
        },
      },
      { $unwind: "$file" },
      { $match: { "file.resource_type": "video" } },
      { $project: { _id: 0, file: 1 } },
      { $sort: { createdAt: -1 } },
      { $skip: page * limit },
      { $limit: limit },
    ]);
    const messVideoAudioMerge = messageVideoAudio.reduce((acc, curr, index, arr) => {
      acc = [...acc, curr.file];
      return acc;
    }, []);
    res.json(messVideoAudioMerge);
  } catch (error) {
    console.log("error getListVideoAudio", error);
  }
};

export const getListDoc = async (req, res) => {
  try {
    const page = +req.query.page;
    const limit = +req.query.limit;
    const messageDoc = await MessageModel.aggregate([
      {
        $match: {
          chatRoom: mongoose.Types.ObjectId(req.params.id),
          messageType: { $in: ["file", "text-file"] },
        },
      },
      { $unwind: "$file" },
      { $match: { "file.resource_type": { $nin: ["video", "image"] } } },
      { $project: { _id: 0, file: 1 } },
      { $sort: { createdAt: -1 } },
      { $skip: page * limit },
      { $limit: limit },
    ]);

    const messDocMerge = messageDoc.reduce((acc, curr, index, arr) => {
      acc = [...acc, curr.file];
      return acc;
    }, []);

    res.json(messDocMerge);
  } catch (error) {
    console.log("error getListVideoAudio", error);
  }
};

export const getAllMedia = async (req, res) => {
  try {
    const type = req.query.type;
    const limit = +req.query.limit;
    const { roomId, messageId } = req.params;

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

    if (!roomId) {
      return res.status(500).json({ message: "room id not defiend" });
    }

    const getAllMedia = await MessageModel.find(
      {
        chatRoom: mongoose.Types.ObjectId(roomId),
        messageType: { $in: ["file", "text-file"] },
        "file.resource_type": { $in: ["image", "video"] },
        "file.thumb": { $ne: "" },
        ...condition,
      },

      { _id: 0, file: 1 }
    )
      .lean()
      .sort({ createdAt: -1 })
      .limit(limit);

    const allMedia = getAllMedia.reduce((acc, curr, index, arr) => {
      return acc.concat(curr.file);
    }, []);

    console.log("allMedia===============>", allMedia);
    res.json({ allMedia });
  } catch (error) {
    console.log("error getAllMedia", error);
  }
};
