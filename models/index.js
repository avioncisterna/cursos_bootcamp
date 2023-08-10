const { DataTypes } = require("sequelize");
const db = require("./db.config");
const { Usuario } = require("./user.model");
const { Bootcamp } = require("./bootcamp.model");

//RELACIONES – MANY TO MANY
Usuario.belongsToMany(Bootcamp, { through: "UsuariosBootcamp" });
Bootcamp.belongsToMany(Usuario, { through: "UsuariosBootcamp" });

try {
  db.sync();
  console.log('Conexión establecida exitosamente a "Bootcamp"');
} catch (error) {
  console.log('Imposible contectar a la base de datos "Bootcamp"', error);
};

//EXPORTS
module.exports = {
  db,
  Usuario,
  Bootcamp,
};
