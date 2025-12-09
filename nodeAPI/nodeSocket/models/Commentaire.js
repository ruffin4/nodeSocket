const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Commentaire = sequelize.define('Commentaire', {
  auteur: {
    type: DataTypes.STRING,
    allowNull: false
  },
  comms: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Commentaire;
