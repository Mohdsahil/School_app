require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// my router

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const chapterRoutes = require("./routes/chapter");
const lectureRoutes = require("./routes/lecture");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static("uploads"));

// DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected....");
  })
  .catch("DB error");

// my routes

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", chapterRoutes);
app.use("/api", lectureRoutes);

app.get("/", (req, res) => {
  res.send("server is run");
});
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is running of port...${PORT}`);
});
