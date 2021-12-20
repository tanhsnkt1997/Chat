import mongoose from "mongoose";
import contactModel from "../models/contact.js";
import userModel from "../models/user.js";

export const getListContact = async (req, res) => {
  try {
    const { _id } = req.user;
    const page = +req.query.page;
    const limit = +req.query.limit;
    console.log("co vaooooooooooooooooooooooooooo", page, limit);

    const listContact = await contactModel.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [{ userId: String(_id) }, { contactId: String(_id) }], //can fix lai
            },
            { status: true },
          ],
        },
      },
      {
        $facet: {
          totalCount: [
            {
              $count: "count",
            },
          ],
          data: [
            {
              $project: {
                _id: 1,
                contactId: 1,
                userId: 1,
                status: 1,
                message: 1,
                updatedAt: 1,
                createdAt: 1,
                info: {
                  $cond: {
                    if: {
                      $eq: ["$userId", String(_id)],
                    },
                    then: { $toObjectId: "$contactId" },
                    else: { $toObjectId: "$userId" },
                  },
                },
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "info",
                foreignField: "_id",
                as: "info",
              },
            },
            {
              $project: {
                _id: 1,
                contactId: 1,
                userId: 1,
                status: 1,
                message: 1,
                updatedAt: 1,
                createdAt: 1,
                contactName: { $arrayElemAt: ["$info.displayName", 0] },
                contactAvatar: { $arrayElemAt: ["$info.avatar", 0] },
                isOnline: { $arrayElemAt: ["$info.isOnline", 0] },
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
      totalCount: listContact[0].totalCount[0].count,
      data: listContact[0].data,
    };

    return res.json(finalData);
  } catch (error) {
    console.log("error get list contact", error);
  }
};

export const getListSearch = async (req, res) => {
  try {
    const { _id } = req.user;
    const key = req.query.key;
    const page = +req.query.page;
    const limit = +req.query.limit;
    console.log("key search in CONTACT", key, page, limit);

    const listContact = await contactModel.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [{ userId: String(_id) }, { contactId: String(_id) }], //can fix lai
            },
            { status: true },
          ],
          // $text: { $search: key.trim() },
        },
      },

      {
        $project: {
          _id: 1,
          contactId: 1,
          userId: 1,
          status: 1,
          message: 1,
          updatedAt: 1,
          createdAt: 1,
          info: {
            $cond: {
              if: {
                $eq: ["$userId", String(_id)],
              },
              then: { $toObjectId: "$contactId" },
              else: { $toObjectId: "$userId" },
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          let: { userIdLookUp: "$info" },
          // localField: "info",
          // foreignField: "_id",
          as: "info",
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$userIdLookUp", "$_id"],
                },
                $text: { $search: key.trim() },
              },
            },
          ],
        },
      },
      {
        $match: {
          $expr: {
            $gt: [{ $size: "$info" }, 0],
          },
        },
      },

      {
        $facet: {
          totalCount: [
            {
              // $project: { _id: 0, count: { $sum: 1 } },
              // $count: "count",
              $project: { _id: 0, count: { $size: "$info" } },
            },
          ],
          data: [
            {
              $project: {
                _id: 1,
                contactId: 1,
                userId: 1,
                status: 1,
                message: 1,
                updatedAt: 1,
                createdAt: 1,
                contactName: { $arrayElemAt: ["$info.displayName", 0] },
                contactAvatar: { $arrayElemAt: ["$info.avatar", 0] },
                isOnline: { $arrayElemAt: ["$info.isOnline", 0] },
              },
            },
          ],
        },
      },
      {
        $project: {
          totalCount: { $sum: "$totalCount.count" },
          data: 1,
        },
      },
      { $sort: { updatedAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);

    const finalData = {
      totalCount: listContact[0].totalCount,
      data: listContact[0].data,
    };

    console.log("finalData Search", listContact);

    res.json(finalData);
  } catch (error) {
    console.log("get list friend Search error:", error);
  }
};

export const getListReq = async (req, res) => {
  try {
    const { _id } = req.user;
    const page = +req.query.page;
    const limit = +req.query.limit;

    const listRequest = await contactModel.aggregate([
      {
        $match: {
          $and: [
            {
              contactId: String(_id),
            },
            { status: false },
          ],
        },
      },
      {
        $facet: {
          totalCount: [
            {
              $count: "count",
            },
          ],
          data: [
            {
              $project: {
                _id: 1,
                contactId: 1,
                userId: 1,
                status: 1,
                message: 1,
                updatedAt: 1,
                createdAt: 1,
                info: { $toObjectId: "$contactId" },
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "info",
                foreignField: "_id",
                as: "info",
              },
            },
            {
              $project: {
                _id: 1,
                contactId: 1,
                userId: 1,
                status: 1,
                message: 1,
                updatedAt: 1,
                createdAt: 1,
                contactName: { $arrayElemAt: ["$info.displayName", 0] },
                contactAvatar: { $arrayElemAt: ["$info.avatar", 0] },
                isOnline: { $arrayElemAt: ["$info.isOnline", 0] },
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
      totalCount: listRequest[0].totalCount[0]?.count || 0,
      data: listRequest[0].data,
    };

    console.log("finalData req::", finalData);
    return res.json(finalData);
  } catch (error) {
    console.log("error get list contact", error);
  }
};

export const getListReqSearch = async (req, res) => {
  const { _id } = req.user;
  const key = req.query.key;
  const page = +req.query.page;
  const limit = +req.query.limit;
  console.log("key search in REQQQ CONTACT", key, page, limit);

  const listContact = await contactModel.aggregate([
    {
      $match: {
        $and: [
          {
            contactId: String(_id),
          },
          { status: false },
        ],
      },
    },

    {
      $project: {
        _id: 1,
        contactId: 1,
        userId: 1,
        status: 1,
        message: 1,
        updatedAt: 1,
        createdAt: 1,
        info: { $toObjectId: "$contactId" },
      },
    },
    {
      $lookup: {
        from: "users",
        let: { userIdLookUp: "$info" },
        // localField: "info",
        // foreignField: "_id",
        as: "info",
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$$userIdLookUp", "$_id"],
              },
              $text: { $search: key.trim() },
            },
          },
        ],
      },
    },
    {
      $match: {
        $expr: {
          $gt: [{ $size: "$info" }, 0],
        },
      },
    },

    {
      $facet: {
        totalCount: [
          {
            // $project: { _id: 0, count: { $sum: 1 } },
            // $count: "count",
            $project: { _id: 0, count: { $size: "$info" } },
          },
        ],
        data: [
          {
            $project: {
              _id: 1,
              contactId: 1,
              userId: 1,
              status: 1,
              message: 1,
              updatedAt: 1,
              createdAt: 1,
              contactName: { $arrayElemAt: ["$info.displayName", 0] },
              contactAvatar: { $arrayElemAt: ["$info.avatar", 0] },
              isOnline: { $arrayElemAt: ["$info.isOnline", 0] },
            },
          },
        ],
      },
    },
    {
      $project: {
        totalCount: { $sum: "$totalCount.count" },
        data: 1,
      },
    },
    { $sort: { updatedAt: -1 } },
    { $skip: (page - 1) * limit },
    { $limit: limit },
  ]);

  const finalData = {
    totalCount: listContact[0].totalCount,
    data: listContact[0].data,
  };

  console.log("finalData Search", finalData);
  res.json(finalData);
};
