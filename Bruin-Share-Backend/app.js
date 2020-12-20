const express = require("express");
const mongoose = require("mongoose");
//access .env file
require("dotenv").config({ path: "./config/.env" });

//connect to database
const connectToMongo=require('./helper/database');
connectToMongo();


const app = express();
const cors = require("cors");
//parse json data
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("this is localhost:5000 page");
});

//auth pages
const authroute = require("./routes/auth");
app.use("/", authroute);

//posting pages
const postroute = require("./routes/post");
app.use("/", postroute);

//user profile pages
const userroute = require("./routes/user");
app.use("/", userroute);

//listen to port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
