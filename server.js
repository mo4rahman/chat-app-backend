/** Import dependencies for server setup */
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(express.json()); // parse json bodies
app.use(morgan("dev")); // logging

// db connection
const { PORT, MONGODB_URL } = process.env;
mongoose.connect(MONGODB_URL);
mongoose.connection
  .on("open", () => console.log("Connected to Database: Successful!"))
  .on("close", () => console.log("Disconnected"))
  .on("error", (error) => console.log(error));

// Create server
app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT ${process.env.PORT}`);
});
