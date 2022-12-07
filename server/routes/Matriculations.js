const { application } = require("express");
const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddleware");
const router = express.Router();
const { Matriculations } = require("../models");

router.post("/", validateToken, async (req, res) => {
  const { CourseId } = req.body;
  const UserId = req.user.id;

  const found = await Matriculations.findOne({
    where: { CourseId: CourseId, UserId: UserId },
  });
  if (!found) {
    await Matriculations.create({ CourseId: CourseId, UserId: UserId });
    res.json({ matriculated: true });
  } else {
    await Matriculations.destroy({
      where: {
        CourseId: CourseId,
        UserId: UserId,
      },
    });
    res.json({ matriculated: false });
  }
});

module.exports = router;
