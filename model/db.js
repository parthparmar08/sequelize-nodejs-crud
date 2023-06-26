const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

// Create a new Sequelize instance with the database configurations
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  // Connection pool configuration
  pool: {
    max: dbConfig.pool.max, // Maximum number of connections allowed in the pool
    min: dbConfig.pool.min, // Minimum number of connections to be kept in the pool
    acquire: dbConfig.pool.acquire, // The maximum time (in milliseconds) to acquire a connection before an error is thrown
    idle: dbConfig.pool.idle, // The maximum time (in milliseconds) that a connection can be idle before being released
  },
});

// Authenticate the connection to the database
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

// Define the models and associate them
db.employees = require("./employeeModel.js")(sequelize, DataTypes);
db.depts = require("./deptModel.js")(sequelize, DataTypes);

// Sync the models with the database
db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

// Define the association between the "depts" and "employees" models
db.depts.hasMany(db.employees, {
  foreignKey: "deptIDFK",
  as: "employee",
});

db.employees.belongsTo(db.depts, {
  foreignKey: "deptIDFK",
  as: "dept",
});

// Export the database object
module.exports = db;
