// ALL CRUD functionalities related to Category
const router = require("express").Router();
const CategoryModel = require("../models/category");

// GET ALL
router.get("/", (req, res) => {
  CategoryModel.find().then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Forbidden get all!");
    }
  });
});

// GET single item
router.get("/:id", (req, res) => {
  CategoryModel.findOne({ _id: req.params.id }).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Forbidden get single!");
    }
  });
});

// POST
router.post("/", (req, res) => {
  let newData = new CategoryModel(req.body);
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
  CategoryModel.findByIdAndUpdate(req.params.id, req.body).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Forbidden put!");
    }
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  CategoryModel.findByIdAndRemove(req.params.id).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(500).send("ID to be deleted not found!");
    }
  });
});

module.exports = router;
