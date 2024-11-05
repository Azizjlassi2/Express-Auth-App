const express = require("express");
const config = require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});
app.use("/api/v1/user", userRoutes);

const mongo_db = process.env.MONGODB_URL.replace(
  "<db_username>",
  process.env.MONGODB_USER
).replace("<db_password>", process.env.MONGODB_USER_PASSWORD);

mongoose.connect(mongo_db).then(() => {
  console.log("Database Connection Established ! ");

  app.listen(process.env.PORT, () => {
    console.log("Server is running on port : " + process.env.PORT);
  });
});
