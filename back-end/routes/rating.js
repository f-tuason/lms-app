// ALL CRUD functionalities related to Rating
const router = require("express").Router();
const RatingModel = require("../models/rating");

// GET ALL
router.get("/", (req, res) => {
  RatingModel.find()
    //.populate(["course", "user"])
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
  RatingModel.findOne({ _id: req.params.id })
    //.populate(["course", "user"])
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
  let newData = new RatingModel(req.body);
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
  RatingModel.findByIdAndUpdate(req.params.id, req.body).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Forbidden put!");
    }
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  RatingModel.findByIdAndRemove(req.params.id).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(500).send("ID to be deleted not found!");
    }
  });
});

module.exports = router;
