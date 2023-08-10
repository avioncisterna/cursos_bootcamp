const { DataTypes: dt } = require("sequelize");
const db = require("./db.config");

//BOOTCAMP
const Bootcamp = db.define(
  "Bootcamp",
  {
    idBootcamp: {
      type: dt.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: dt.STRING,
      allowNull: false,
    },
    cue: {
      type: dt.INTEGER,
      allowNull: false,
      validate: {
        min: 5,
        max: 20,
      },
    },
    description: {
      type: dt.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

//RELACIÓN – BELONGS TO MANY
Bootcamp.associate = (models) => {
  Bootcamp.belongsToMany(models.Usuario, { through: "UsuariosBootcamp" });
};

//SYNC
async function syncBootcamp() {
  try {
    await db.sync();
    console.log('Conexión establecida exitosamente a "Bootcamp"');
  } catch (error) {
    console.log('Imposible contectar a la base de datos "Bootcamp"', error);
  }
}
syncBootcamp();

//EXPORT
module.exports = { Bootcamp };
