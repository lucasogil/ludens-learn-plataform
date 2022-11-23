const { application } = require("express");
const express = require("express");
const router = express.Router();
const { Courses } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfCourses = await Courses.findAll();
  res.json(listOfCourses);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const course = await Courses.findByPk(id);
  res.json(course);
});

router.post("/", validateToken, async (req, res) => {
  const course = req.body;
  course.instructorName = req.user.username;
  course.UserId = req.user.id;
  const newCourse = await Courses.create(course);
  res.json(newCourse);
});

router.put("/editcourse", validateToken, async (req, res) => {
  const courseUpdated = req.body;
  await Courses.update(
    {
      title: courseUpdated.title,
      description: courseUpdated.description,
      level: courseUpdated.level,
      category: courseUpdated.category,
    },
    { where: { id: courseUpdated.id } }
  );
  res.json("SUCCESS");
});

module.exports = router;
