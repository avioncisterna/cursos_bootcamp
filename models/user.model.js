const { DataTypes: dt } = require("sequelize");
const db = require("./db.config");

//USUARIO
const Usuario = db.define(
  "Usuario",
  {
    idUsuario: {
      type: dt.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: dt.STRING,
      allowNull: false,
    },
    lastName: {
      type: dt.STRING,
      allowNull: false,
    },
    email: {
      type: dt.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  { timestamps: true }
);

//RELACIÓN – BELONGS TO MANY
Usuario.associate = (models) => {
    Usuario.belongsToMany(models.Bootcamp, { through: "UsuariosBootcamp" });
  };

//SYNC
async function syncUsuarios() {
  try {
    await db.sync();
    console.log('Conexión establecida exitosamente a "Usuarios"');
  } catch (error) {
    console.log('Imposible contectar a la base de datos "Usuarios"', error);
  }
}
syncUsuarios();

//EXPORT
module.exports = { Usuario };
