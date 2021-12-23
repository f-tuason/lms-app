// ALL CRUD functionalities related to Payment
const router = require("express").Router();
const PaymentModel = require("../models/payment");
const UserModel = require("../models/user");
const CourseModel = require("../models/course");

// GET ALL
router.get("/", (req, res) => {
  PaymentModel.find()
    .populate(["student", "course", "discount"])
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
  PaymentModel.findOne({ _id: req.params.id })
    .populate(["student", "course", "discount"])
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
  let newData = new PaymentModel(req.body);
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
  PaymentModel.findByIdAndUpdate(req.params.id, req.body).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(403).send("Forbidden put!");
    }
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  PaymentModel.findByIdAndRemove(req.params.id).then((response) => {
    if (response) {
      res.send(response);
    } else {
      res.status(500).send("ID to be deleted not found!");
    }
  });
});

// POST
router.post("/payforcourse/:userid/:courseid", (req, res) => {
  let cid = req.params.courseid;
  let uid = req.params.userid;
  let pid;
  let success1 = false;
  let success2 = false;
  let success3 = false;

  let newData = new PaymentModel({
    student: uid,
    course: cid,
    total: req.body.total,
  });

  newData.save().then((response) => {
    if (response) {
      success1 = true;
      CourseModel.findByIdAndUpdate(cid, { $push: { student: uid } }).then(
        (response) => {
          if (response) {
            success2 = true;
          } else {
            success2 = false;
          }
        }
      );

      UserModel.findByIdAndUpdate(uid, {
        $push: { course: cid, payment: response._id },
      }).then((response) => {
        if (response) {
          success3 = true;
        } else {
          success3 = false;
        }
      });

      res.send("okay");
    } else {
      success1 = false;
    }
  });
});

module.exports = router;
