const { application } = require("express");
const express = require("express");
const router = express.Router();
const { Chapters } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  const chapters = await Chapters.findAll({ where: { CourseId: courseId } });
  res.json(chapters);
});

router.post("/", validateToken, async (req, res) => {
  const chapter = req.body;
  const newChapter = await Chapters.create(chapter);
  res.json(newChapter);
});

router.delete("/:chapterId", validateToken, async (req, res) => {
  const chapterId = req.params.chapterId;

  await Chapters.destroy({
    where: {
      id: chapterId,
    },
  });

  res.json("Delete Successfully!!!");
});

module.exports = router;