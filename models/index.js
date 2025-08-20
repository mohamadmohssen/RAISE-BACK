require("dotenv").config(); // Load environment variables

const { Sequelize, DataTypes } = require("sequelize");

// Create Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,     // database name
  process.env.DB_USER,     // username
  process.env.DB_PASSWORD, // password
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql", // default to mysql if not set
    logging: false, // disable SQL logs (optional)

    pool: {
      max: parseInt(process.env.DB_POOL_MAX) || 5,
      min: parseInt(process.env.DB_POOL_MIN) || 0,
      acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000,
      idle: parseInt(process.env.DB_POOL_IDLE) || 10000,
    },
  }
);

// Test DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected...");
  })
  .catch((err) => {
    console.error("❌ DB Connection Error: " + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.user = require("./userModel.js")(sequelize, DataTypes);
db.question = require("./questionModel.js")(sequelize, DataTypes);
db.admin = require("./adminModel.js")(sequelize, DataTypes);
db.userAdmin = require("./userAdminModel.js")(sequelize, DataTypes);
db.userQuestion = require("./UserQuestionModel.js")(sequelize, DataTypes);
db.type = require("./typeModel.js")(sequelize, DataTypes);
db.base = require("./baseModel.js")(sequelize, DataTypes);

// Sync DB
db.sequelize.sync({ force: false }).then(() => {
  console.log("✅ DB re-sync done!");
});

// Relationships
db.user.belongsToMany(db.question, {
  through: db.userQuestion,
  foreignKey: "user_id",
});
db.question.belongsToMany(db.user, {
  through: db.userQuestion,
  foreignKey: "question_id",
});

db.user.belongsToMany(db.admin, {
  through: db.userAdmin,
  foreignKey: "user_id",
});
db.admin.belongsToMany(db.user, {
  through: db.userAdmin,
  foreignKey: "admin_id",
});

db.userAdmin.belongsTo(db.user, { foreignKey: "user_id" });
db.userAdmin.belongsTo(db.admin, { foreignKey: "admin_id" });

module.exports = db;
