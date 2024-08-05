const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Job = sequelize.define("job", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(2048),
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING(2048),
    allowNull: false,
  },
  salary: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(2048),
    allowNull: false,
  },
  companyName: {
    type: Sequelize.STRING(2048),
    allowNull: false,
  },
  companyDescription: {
    type: Sequelize.STRING(2048),
    allowNull: false,
  },
  contactEmail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  contactPhone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Job;
