const { application } = require("express");
const express = require("express");
const router = express.Router();

const { validateToken } = require("../middlewares/AuthMiddleware");

const { VideoDetails } = require("../models");

router.get("/", validateToken, (req, res, next) => {
  VideoDetails.findAll()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/byChapterId/:id", async (req, res) => {
  const chapterId = req.params.id;
  const videoChapter = await VideoDetails.findOne({
    where: { ChapterId: chapterId },
  });
  res.json(videoChapter);
});

module.exports = router;
