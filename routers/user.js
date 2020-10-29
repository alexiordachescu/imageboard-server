const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models").user;
const Image = require("../models").image;

const router = new Router();

router.get("/", async (req, res, next) => {
  const user = await User.findAll();
  res.json(user);
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(400).send("Missing parameters");
    } else {
      const newUser = await User.create({
        email,
        password: bcrypt.hashSync(password, 10),
        fullName,
      });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
