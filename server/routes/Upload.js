const express = require("express");
const router = express.Router();
const multer = require("multer");

const { validateToken } = require("../middlewares/AuthMiddleware");

const thumbnailGenerator = require("../helpers/videoThumbnail");
const port = require("../config/default").port;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, "_"));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50, //50MB
  },
});

router.post("/", validateToken, upload.single("file"), (req, res, next) => {
  thumbnailGenerator.generateThumbnail(
    // /api/videos is made publically available in App.js
    "http://localhost:" +
      port +
      "/api/videos/" +
      req.file.filename.replace(/ /g, "_"),
    req.file.filename.replace(/ /g, "_"),
    req.user.username
  );
  res.status(200).json({
    message: "Video Upload Successful",
  });
});

module.exports = router;
