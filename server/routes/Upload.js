const express = require("express");
const router = express.Router();
const multer = require("multer");

const { validateToken } = require("../middlewares/AuthMiddleware");

const thumbnailGenerator = require("../helpers/videoThumbnail");
const port = require("../config/default").port;

const fileNameFormated = { filenameTarget: "", filenameTitle: "" };

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, formatFileName(file.originalname)["filenameTarget"]);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50, //50MB
  },
});

function formatFileName(filename) {
  filename = filename.replace(/ /g, "_");
  const randomNumber = Math.floor(Math.random() * 100);
  const auxArray = filename.split(".");
  fileNameFormated.filenameTarget = auxArray[0]
    .concat(randomNumber + ".")
    .concat(auxArray[1]);
  fileNameFormated.filenameTitle = filename.concat(randomNumber);
  return fileNameFormated;
}

router.post(
  "/:chapterId",
  validateToken,
  upload.single("file"),
  (req, res, next) => {
    thumbnailGenerator.generateThumbnail(
      // /api/videos is made publically available in App.js
      "http://localhost:" +
        port +
        "/api/videos/" +
        fileNameFormated["filenameTarget"],
      fileNameFormated["filenameTitle"],
      req.user.username,
      req.params.chapterId
    );
    res.status(200).json({
      message: "Video Upload Successful",
    });
  }
);

module.exports = router;
