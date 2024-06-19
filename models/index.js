const dbConfig = require("../config/dbconfig.js");

const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./userModel.js")(sequelize, DataTypes);
db.question = require("./questionModel.js")(sequelize, DataTypes);
db.admin = require("./adminModel.js")(sequelize, DataTypes);
db.userAdmin = require("./userAdminModel.js")(sequelize, DataTypes);
db.userQuestion = require("./UserQuestionModel.js")(sequelize, DataTypes);
db.type = require("./typeModel.js")(sequelize, DataTypes);
db.base = require("./baseModel.js")(sequelize, DataTypes);
db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

// 1 to Many Relation

//user and question many to many relation ship

db.user.belongsToMany(db.question, {
  through: db.userQuestion,
  foreignKey: "user_id",
});
db.question.belongsToMany(db.user, {
  through: db.userQuestion,
  foreignKey: "question_id",
});

//user and admin many to many relation ship
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
