const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers

//admin
const router = require("./routes/adminRouter.js");
app.use("/api/admin", router);
//question
const route = require("./routes/questionRouter.js");
app.use("/api/question", route);
//user
const userrouter = require("./routes/userRouter.js");
app.use("/api/user", userrouter);
// static Images Folder
app.use("/Images", express.static("./Images"));

// port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
