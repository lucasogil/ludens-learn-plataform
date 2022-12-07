const { application } = require("express");
const express = require("express");
const router = express.Router();
const { Courses, Matriculations } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfCourses = await Courses.findAll();
  res.json(listOfCourses);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const course = await Courses.findByPk(id, { include: [Matriculations] });
  res.json(course);
});

router.get("/byUserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfCourses = await Courses.findAll({
    where: { UserId: id },
  });
  res.json(listOfCourses);
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
