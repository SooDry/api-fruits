const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("api-fruits", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    raw: true,
  });
  const db = {};
  
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
  //instanciar tablas que se utilizaran
  db.user = require("./models/user")(sequelize, Sequelize);

  module.exports = db