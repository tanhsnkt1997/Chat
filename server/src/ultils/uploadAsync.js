import multer from "multer";

let fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/files");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
  },
});

let fileUpload = multer({
  storage: fileStorage,
  limits: { fileSize: 5242880 },
});

const uploadAsyncOneFile = (req, res, file) => {
  const upload = fileUpload.single("file");
  return new Promise(function (resolve, reject) {
    upload(req, res, function (error) {
      if (error) {
        console.log("error in upload file", error);
        if (error.message) {
          return reject({ statusCode: 500, message: "Size img too large" });
        }
        return reject({ statusCode: 500, message: error });
      }
      return resolve();
    });
  });
};

// uploadImage.array("image");

const uploadAsynAnyFile = (req, res, file) => {
  const upload = fileUpload.array("file");

  return new Promise(function (resolve, reject) {
    upload(req, res, function (error) {
      if (error) {
        console.log("error in upload array files", error);
        if (error.message) {
          return reject({ statusCode: 500, message: "Size img too large" });
        }
        return reject({ statusCode: 500, message: error });
      }
      return resolve();
    });
  });
};

export default { uploadAsyncOneFile, uploadAsynAnyFile };
