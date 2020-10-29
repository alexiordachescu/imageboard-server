const { Router } = require("express");
const User = require("../models").user;
const Image = require("../models").image;
const router = new Router();
const { toJWT, toData } = require("../auth/jwt");

router.get("/", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
    } catch (e) {
      res.status(404).send("Invalid JWT Token");
    }
    const image = await Image.findAll();
    res.json(image);
  } else {
    res.status(401).send("Please supply some valid credentials");
  }
});

router.get("/:title", async (req, res, next) => {
  try {
    const title = req.params.title;
    const image = await Image.findOne({ where: { title: `${title}` } });
    if (!image) {
      res.status(400).send("No image found");
    } else {
      res.json(image);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const addImage = await Image.create(req.body);
    res.json(addImage);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
