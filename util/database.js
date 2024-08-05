const Sequelize = require("sequelize");
require("dotenv").config();

if (process.env.ENVIRONMENT === "DEV") {
  const sequelize = new Sequelize(
    process.env.DEVELOPMENT_MYSQL_DB,
    process.env.DEVELOPMENT_MYSQL_USER,
    process.env.DEVELOPMENT_MYSQL_PASSWORD,
    {
      dialect: "mysql",
      host: process.env.DEVELOPMENT_MYSQL_HOST,
    }
  );
  module.exports = sequelize;
} else {
  const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      dialect: "mysql",
      host: process.env.MYSQL_HOST,
    }
  );
  module.exports = sequelize;
}
