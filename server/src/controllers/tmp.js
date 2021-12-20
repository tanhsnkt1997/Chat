let user = await User.findById(_id, "chatRooms")
  // .skip((page - 1) * limit)
  // .limit(limit)
  .populate({
    path: "chatRooms.data",
    populate: [
      {
        path: "members",
        select: "-chatRooms",
        sort: { createdAt: -1 },
        skip: (page - 1) * limit, //start with 1
        limit: limit,
      },
      {
        path: "lastMessage",
        perDocumentLimit: 1,
      },
    ],
  });

// CONTATC
const contatcs = await contactModel
  .find({
    $and: [{ $or: [{ userId: _id }, { contactId: _id }] }, { status: true }],
  })
  .sort({ updatedAt: -1 })
  .skip((page - 1) * limit)
  .limit(limit);

// .sort({ "updatedAt": -1 }).skip(skipNumber).limit(limit).exec();
const listContactUpdated = contatcs.map(async (contact) => {
  contact = contact.toObject();
  if (contact.userId === _id) {
    let user = await userModel.findById(contact.contactId);
    contact.contactName = user.displayName;
    contact.contactAvatar = user.avatar;
    contact.isOnline = user.isOnline;
  } else {
    let user = await userModel.findById(contact.userId);
    contact.contactName = user.displayName;
    contact.contactAvatar = user.avatar;
    contact.isOnline = user.isOnline;
  }
  return contact;
});
const listContactUpdatedPromise = await Promise.all(listContactUpdated);
