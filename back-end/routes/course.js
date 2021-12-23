// ALL CRUD functionalities related to Course
const router = require("express").Router();
const CourseModel = require("../models/course");

// GET ALL
router.get("/", (req, res) => {
  CourseModel.find()
    .populate(["category", "teacher", "student", "outline", "rating"])
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
  CourseModel.findOne({ _id: req.params.id })
    .populate(["category", "teacher", "student", "outline", "rating"])
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
  let newData = new CourseModel(req.body);
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
  CourseModel.findByIdAndUpdate(req.params.id, req.body).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Forbidden put!");
    }
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  CourseModel.findByIdAndRemove(req.params.id).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(500).send("ID to be deleted not found!");
    }
  });
});

// GET courses by category
router.get("/category/:id", (req, res) => {
  CourseModel.find({ category: req.params.id })
    .populate(["category", "teacher", "student", "outline", "rating"])
    .then((response) => {
      if (response) {
        res.send(response);
      } else {
        res.status(403).send("Forbidden get single!");
      }
    });
});

// GET courses by category
router.get("/findbyteacher/:id", (req, res) => {
  CourseModel.find({ teacher: req.params.id })
    .populate(["category", "teacher", "student", "outline", "rating"])
    .then((response) => {
      if (response) {
        res.send(response);
      } else {
        res.status(403).send("Forbidden get single!");
      }
    });
});

module.exports = router;
