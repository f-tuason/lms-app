const router = require("express").Router();
const bcrypt = require("bcrypt");
const { findByIdAndUpdate } = require("../models/user");
const UserModel = require("../models/user");

// Route that will check if an email exist
router.post("/email-exists", (req, res) => {
  UserModel.findOne({ email: req.body.email }).then((response) => {
    // res.data == true ( existing), false ( not existing )
    if (response) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});

// Route that will register users
router.post("/register", async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, 10);

  let newUser = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    permission: req.body.permission,
  });

  newUser.save().then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Cannot create user!");
    }
  });
});

// Route that will register users
router.patch("/update/:id", async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, 10);

  let newUser = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  findByIdAndUpdate(req.param.id, { newUser }).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Cannot create user!");
    }
  });
});

// Route for login
router.post("/login", (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .populate(["permission", "course", "payment", "rating"])
    .then(async (foundUser) => {
      if (foundUser) {
        let match = await bcrypt.compare(req.body.password, foundUser.password);
        if (match) {
          res.send({ message: "Authentication Successfull", user: foundUser });
        } else {
          res.send({ error: "Authentication Failed" });
        }
      } else {
        res.send({ error: "Email not found!" });
      }
    });
});

module.exports = router;
