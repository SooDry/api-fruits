const bcrypt = require("bcrypt");

//Importar tipos de datos de sequelize
module.exports = (sequelize, Sequelize) => {
  //Crear tabla en db
  const encryptPassword = bcrypt.hashSync("password", 10)
  const User = sequelize.define("user", {
    index: {
      type: Sequelize.INTEGER,

    },
    guid: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: encryptPassword,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
    },
    balance: {
      type: Sequelize.STRING,
    },
    eyeColor: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    company: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    img: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    registered: {
      type: Sequelize.STRING,
    },
    latitude: {
      type: Sequelize.INTEGER,
    },
    longitude: {
      type: Sequelize.INTEGER,
    },
    friends: {
      type: Sequelize.JSON,
    },
    favoriteFruit: {
      type: Sequelize.STRING,
    },
  });
  return User;
};