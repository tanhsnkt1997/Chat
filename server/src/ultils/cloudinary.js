import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//chu y bao mat
cloudinary.config({
  cloud_name: "taxuananh",
  api_key: "715461177925689",
  api_secret: "gGdPJQYiwrU_uhcb0Ji9KHLhtDs",
});

const reSizeImage = (id, h, w) => {
  return cloudinary.url(id, {
    height: h,
    width: w,
    crop: "scale",
    format: "jpg",
  });
};

const creatThumVideo = (id) => {
  return cloudinary.url(`${id}.jpg`, { start_offset: "0", resource_type: "video" });
};

export const uploadAvtar = (file) => {
  return new Promise((resolve, reject) => {
    try {
      cloudinary.uploader
        .upload(file.path, {
          folder: "avatar",
        })
        .then((result) => {
          if (result) {
            fs.unlinkSync(`${file.destination}/${file.filename}`);
            resolve({
              url: result.secure_url,
            });
          }
        })
        .catch((err) => {
          console.log("err upload video", err);
          reject(err);
        });
    } catch (error) {
      console.log("err upload video", err);
      reject(error);
    }
  });
};

export const uploadMultipleVideos = async (arrayVideos) => {
  return new Promise(async (resolve, reject) => {
    try {
      let multipleVideoPromise = arrayVideos.map(
        (video) =>
          new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload(video.path, {
                folder: "video",
                resource_type: "video",
              })
              .then((result) => {
                fs.unlinkSync(`${video.destination}/${video.filename}`);
                resolve({
                  url: result.secure_url,
                  id: result.public_id,
                  thumb: creatThumVideo(result.public_id),
                });
              })
              .catch((err) => {
                console.log("err upload video", err);
              });
          })
      );
      let fileResponses = await Promise.all(multipleVideoPromise);
      resolve(fileResponses);
    } catch (error) {
      reject(error);
    }
  });
};
const checkShowthumb = (id, mimeType) => {
  let mimeAudios = [
    "audio/basic",
    "auido/L24",
    "audio/mid",
    "audio/mpeg",
    "audio/mp4",
    "audio/x-aiff",
    "audio/x-aiff",
    "audio/x-mpegurl",
    "audio/vnd.wav",
  ];
  let mimeVideos = [
    "video/webm",
    "video/x-flv",
    "video/mp4",
    "application/x-mpegURL",
    "video/MP2T",
    "video/3gpp",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-ms-wmv",
  ];
  let mimeImgs = [
    "image/gif",
    "image/ief",
    "image/png",
    "image/webp",
    "image/jpeg",
    "image/pipeg",
    "image/svg+xml",
    "image/tiff",
    "image/x-icon",
    "image/x-rgb",
  ];
  if (mimeImgs.includes(mimeType)) {
    return reSizeImage(id, 300, 300);
  }
  if (mimeVideos.includes(mimeType)) {
    return creatThumVideo(id);
  }
};

export const uploadMultipleFiles = (arrayFile, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let multipleFilePromise = arrayFile.map(
        (file) =>
          new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload(file.path, {
                folder: "file",
                resource_type: "auto",
              })
              .then((result) => {
                console.log("result", result);
                // remove
                if (type !== "forward") {
                  fs.unlinkSync(`${file.destination}/${file.filename}`);
                }

                resolve({
                  fileName: file.originalname,
                  fileSize: result.bytes,
                  url: result.secure_url,
                  resource_type: result.resource_type,
                  format: result.format,
                  mimetype: file.mimetype,
                  public_id: result.public_id,
                  thumb: checkShowthumb(result.public_id, file.mimetype),
                });
              })
              .catch((err) => {
                console.log("err upload file", err);
              });
          })
      );
      let fileResponses = await Promise.all(multipleFilePromise);
      resolve(fileResponses);
    } catch (error) {
      reject(error);
    }
  });
};
