const { Router } = require("express");
const User = require("../models").user;
const bcrypt = require("bcrypt");
const { toJWT, toData } = require("../auth/jwt");

const router = new Router();

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Please supply a valid email and password");
  }
  try {
    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) {
      res.status(400).send("User with this e-mail not found");
    } else if (bcrypt.compareSync(password, foundUser.password)) {
      res.send({ jwt: toJWT({ id: foundUser.id }) });
    } else {
      res.status(400).send("Password is incorrect!");
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
