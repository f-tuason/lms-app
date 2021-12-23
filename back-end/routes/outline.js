// ALL CRUD functionalities related to Outline
const router = require("express").Router();
const OutlineModel = require("../models/outline");
const CourseModel = require("../models/course");

// GET ALL
router.get("/", (req, res) => {
  OutlineModel.find()
    .populate("course")
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
  OutlineModel.findOne({ _id: req.params.id })
    .populate("course")
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
  let newData = new OutlineModel(req.body);
  newData.save().then((response) => {
    if (response) {
      res.send(response);
      CourseModel.findByIdAndUpdate(newData.course, {
        $push: { outline: response._id },
      }).then((result) => {
        res.send(result);
      });
    } else {
      res.status(403).send("Forbidden post!");
    }
  });
});

// PUT update item
router.put("/:id", (req, res) => {
  OutlineModel.findByIdAndUpdate(req.params.id, req.body).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Forbidden put!");
    }
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  OutlineModel.findByIdAndRemove(req.params.id).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(500).send("ID to be deleted not found!");
    }
  });
});

// GET ALL
router.get("/outlinebycourse/:courseid", (req, res) => {
  OutlineModel.find({ course: req.params.courseid }).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Forbidden get all!");
    }
  });
});

module.exports = router;
