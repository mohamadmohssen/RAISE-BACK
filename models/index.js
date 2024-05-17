const dbConfig = require("../config/dbconfig.js");

const { Sequelize, DataTypes } = require("sequelize");

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

db.products = require("./productModel.js")(sequelize, DataTypes);
db.reviews = require("./reviewModel.js")(sequelize, DataTypes);
db.user = require("./userModel.js")(sequelize, DataTypes);
db.question = require("./questionModel.js")(sequelize, DataTypes);
db.admin = require("./adminModel.js")(sequelize, DataTypes);
db.userAdmin = require("./userAdminModel.js")(sequelize, DataTypes);
db.userQuestion = require("./UserQuestionModel.js")(sequelize, DataTypes);
db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

// 1 to Many Relation

db.products.hasMany(db.reviews, {
  foreignKey: "product_id",
  as: "review",
});

db.reviews.belongsTo(db.products, {
  foreignKey: "product_id",
  as: "product",
});

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

module.exports = db;
