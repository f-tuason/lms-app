// ALL CRUD functionalities related to User
const router = require("express").Router();
const UserModel = require("../models/user");

// GET ALL
router.get("/", (req, res) => {
  UserModel.find()
    .populate(["permission", "course", "payment", "rating"])
    .then((response) => {
      if (response) {
        res.send(response);
      } else {
        res.status(403).send("Forbidden get all!");
      }
    });
});

// GET single item
router.get("/:id", (req, res) => {
  UserModel.findOne({ _id: req.params.id })
    .populate(["permission", "course", "payment", "rating"])
    .then((response) => {
      if (response) {
        res.send(response);
      } else {
        res.status(403).send("Forbidden get single!");
      }
    });
});

// POST
router.post("/", (req, res) => {
  let newData = new UserModel(req.body);
  newData.save().then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Forbidden post!");
    }
  });
});

// PUT update item
router.put("/:id", (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, req.body).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Forbidden put!");
    }
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  UserModel.findByIdAndRemove(req.params.id).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(500).send("ID to be deleted not found!");
    }
  });
});

module.exports = router;
