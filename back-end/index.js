const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8000;

const CourseModel = require("./models/course");

// Use body-parser
app.use(bodyParser.json());

// Use cors
app.use(cors());

// Connect to our MongoDB
mongoose.connect("mongodb://localhost:27017/lmsdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import routers into system
const userRouter = require("./routes/user");
const permissionRouter = require("./routes/permission");
const categoryRouter = require("./routes/category");
const courseRouter = require("./routes/course");
const discountRouter = require("./routes/discount");
const outlineRouter = require("./routes/outline");
const paymentRouter = require("./routes/payment");
const ratingRouter = require("./routes/rating");
const registerRouter = require("./routes/register");

// Define default endpoints for routers
app.use("/users", userRouter);
app.use("/permissions", permissionRouter);
app.use("/categories", categoryRouter);
app.use("/courses", courseRouter);
app.use("/discounts", discountRouter);
app.use("/outlines", outlineRouter);
app.use("/payments", paymentRouter);
app.use("/ratings", ratingRouter);

// Route for Registration, Login, email-exist
app.use("/", registerRouter);

// Define a default route for root
app.get("/", (req, res) => {
  // Define our response to the client
  res.send("Welcome to our express server");
});

// Define a default route for search
app.post("/search", (req, res) => {
  // Define our response to the client
  CourseModel.find({ teacher: req.body.term })
    .populate(["teacher", "student", "outline", "rating"])
    .then((result) => {
      res.send(result);
    });
});

// Define a catch all route
app.get("*", (req, res, next) => {
  res.status(500).send("Invalid Route");
});

// Start our express server
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
