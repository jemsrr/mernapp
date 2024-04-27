const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./router/userRoute")
app.use(express.json())
const cors = require("cors")
app.use(cors())

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("connected successfuly");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("running successfully at", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

  app.use(userRoute)

