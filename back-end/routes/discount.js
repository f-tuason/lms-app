// ALL CRUD functionalities related to Discount
const router = require("express").Router();
const DiscountModel = require("../models/discount");

// GET ALL
router.get("/", (req, res) => {
  DiscountModel.find().then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Forbidden get all!");
    }
  });
});

// GET single item
router.get("/:id", (req, res) => {
  DiscountModel.findOne({ _id: req.params.id }).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Forbidden get single!");
    }
  });
});

// POST
router.post("/", (req, res) => {
  let newData = new DiscountModel(req.body);
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
  DiscountModel.findByIdAndUpdate(req.params.id, req.body).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Forbidden put!");
    }
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  DiscountModel.findByIdAndRemove(req.params.id).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(500).send("ID to be deleted not found!");
    }
  });
});

module.exports = router;
