// ALL CRUD functionalities related to Permission
const router = require("express").Router();
const PermissionModel = require("../models/permission");

// GET ALL
router.get("/", (req, res) => {
  PermissionModel.find().then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Forbidden get all!");
    }
  });
});

// GET single item
router.get("/:id", (req, res) => {
  PermissionModel.findOne({ _id: req.params.id }).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Forbidden get single!");
    }
  });
});

// POST
router.post("/", (req, res) => {
  let newData = new PermissionModel(req.body);
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
  PermissionModel.findByIdAndUpdate(req.params.id, req.body).then(
    (response) => {
      if (response) {
        res.send(response);
      } else {
        res.status(403).send("Forbidden put!");
      }
    }
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  PermissionModel.findByIdAndRemove(req.params.id).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(500).send("ID to be deleted not found!");
    }
  });
});

module.exports = router;
