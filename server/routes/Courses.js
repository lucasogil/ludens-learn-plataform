const { application } = require("express");
const express = require("express");
const router = express.Router();
const { Courses } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const course = req.body;
  course.instructorName = req.user.username;
  course.UserId = req.user.id;
  await Courses.create(course);
  res.json(course);
});

module.exports = router;
