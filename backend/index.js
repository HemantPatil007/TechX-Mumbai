require("dotenv").config();
let cors = require("cors");
const express = require("express");
const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
const app = express();

//middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

//db
const connectDB = require("./db/connect");

app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Initialized successfully !");
});

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, console.log(`Server started at port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
