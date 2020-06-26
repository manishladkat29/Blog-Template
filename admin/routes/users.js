const express = require("express");
const router = express.Router();
const bodyParser= require('body-parser');
const User = require("../models/User");

router.use(express.json());
router.use(express.static(__dirname + '/static'));
router.use(bodyParser.urlencoded({ extended: true }))

//Get All
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
    //res.render('list_users.ejs', { data: users});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get One
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

//Create One
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    password: req.body.password,
    status: req.body.status
  });
  try {
    const newUser = await user.save();
    res.status(201).json({ newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Patch One
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.status != null) {
    res.user.status = req.body.status;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete One
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "User has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getUser middleware
async function getUser(req, res, next) {
  let user;
  try {
      user = await User.findById(req.params.id);
      if (user == null) {
          return res.status(404).json({ message: "Cannot find User" });
      }
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;