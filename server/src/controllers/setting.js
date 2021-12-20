import userModel from "../models/user.js";
import uploadFile from "../ultils/uploadAsync.js";
import { uploadAvtar } from "../ultils/cloudinary.js";

export const updateProfile = async (req, res) => {
  try {
    const { displayName } = req.body;
    const { _id } = req.user;

    if (!displayName) {
      return res.status(500).json({ message: "displayName can't empty." });
    }
    let userUpdated = await userModel.findByIdAndUpdate(_id, { displayName }, { new: true });
    res.json(userUpdated);
  } catch (error) {
    console.log("error updateProfile", error);
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;

    await uploadFile.uploadAsyncOneFile(req, res);
    let avatarUploaded = await uploadAvtar(req.file);
    let userUpdated = await userModel.findByIdAndUpdate(_id, { avatar: avatarUploaded.url }, { new: true });
    res.json(userUpdated);
  } catch (error) {
    console.log("error updateAvatar", error);
  }
};
