const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('achat_fanafody', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

module.exports = sequelize;
