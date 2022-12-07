const { application } = require("express");
const express = require("express");
const router = express.Router();
const { Documents } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:chapterId", async (req, res) => {
  const chapterId = req.params.chapterId;
  const documents = await Documents.findAll({
    where: { ChapterId: chapterId },
  });
  res.json(documents);
});

router.post("/", validateToken, async (req, res) => {
  const document = req.body;
  const newDocument = await Documents.create(document);
  res.json(newDocument);
});

router.delete("/:documentId", validateToken, async (req, res) => {
  const documentId = req.params.documentId;

  await Documents.destroy({
    where: {
      id: documentId,
    },
  });

  res.json("Delete Successfully!!!");
});

router.put("/changefirebaseurl", validateToken, async (req, res) => {
  const { firebaseUrl, documentId } = req.body;

  Documents.update({ firebaseUrl: firebaseUrl }, { where: { id: documentId } });

  res.json("SUCCESS");
});

module.exports = router;
