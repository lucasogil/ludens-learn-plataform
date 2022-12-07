const { application } = require("express");
const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const { validateToken } = require("../middlewares/AuthMiddleware");

const JWT_SECRET = "importantsecret";

router.post("/", async (req, res) => {
  const { email, username, password, type } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (user) res.json({ error: "Usuario existente!!!" });
  else {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        email: email,
        username: username,
        password: hash,
        type: type,
      });
      res.json("SUCCESS");
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "Usuario não existe!!!" });
  else {
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match)
        res.json({ error: "Combinação de Usuario e Senha Incorreta!" });
      else {
        const accessToken = jwt.sign(
          { username: user.username, id: user.id, type: user.type },
          "importantsecret"
        );
        res.json({
          token: accessToken,
          username: username,
          id: user.id,
          type: user.type,
        });
      }
    });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Senha Informada esta Incorreta!" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json("SUCCESS");
    });
  });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await Users.findOne({ where: { email: email } });
    if (!oldUser) {
      return res.json({ status: "Usuario não existe!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:3001/api/users/reset-password/${oldUser.id}/${token}`;
    console.log("link=" + link);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ludens.suporte@gmail.com",
        pass: "rztlaihoqbjszogf",
      },
    });

    var mailOptions = {
      from: "ludens.suporte@gmail.com",
      to: email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Email error: " + error);
        return res.json(error);
      } else {
        console.log("Email sent: " + info.response);
        return res.json("Email enviado!");
      }
    });
    console.log(link);
  } catch (error) {
    console.log(error);
    return res.json("Erro de Envio");
  }
});

router.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await Users.findOne({ where: { id: id } });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await Users.findOne({ where: { id: id } });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await Users.update({ password: encryptedPassword }, { where: { id: id } });
    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

module.exports = router;
