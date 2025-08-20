// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Initialize Express
const app = express();

// middleware
app.use(
  cors({
    credentials: true,
    // Optionally control allowed origins via env (comma-separated)
    // origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.get('/', (req, res) => {
  res.send('Server is running!');
});
// admin
const router = require("./routes/adminRouter.js");
app.use("/api/admin", router);
// question
const route = require("./routes/questionRouter.js");
app.use("/api/question", route);
// user
const userrouter = require("./routes/userRouter.js");
app.use("/api/user", userrouter);
// type
const typerouter = require("./routes/typeRouter.js");
app.use("/api/type", typerouter);
// user admin route
const useradminrouter = require("./routes/userAdminRouter.js");
app.use("/api/useradmin", useradminrouter);
// user question route
const userquestionrouter = require("./routes/userQuestionRouter.js");
app.use("/api/userquestion", userquestionrouter);
// base route
const baserouter = require("./routes/baseRouter.js");
app.use("/api/base", baserouter);

// Health check (useful for Render)
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

// DB + server start
const { sequelize } = require("./models"); // <- uses models/index.js above
const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
    // await sequelize.sync(); // Enable if you want auto sync
    app.listen(PORT, () => {
      console.log(`🚀 server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
})();
