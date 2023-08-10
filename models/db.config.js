const Sequelize = require("sequelize");

//1. CREACIÓN BASE DE DATOS
const db = new Sequelize("db_bootcamp", "javieracisterna", "1234", {
  host: "localhost",
  dialect: "postgres",
});

//2. SINCRONICACIÓN BASE DE DAT0S
async function syncDB() {
  try {
    await db.authenticate();
    console.log("Conexión establecida exitosamente");
  } catch (error) {
    console.log("Imposible contectar a la base de datos", error);
  }
}
syncDB();

module.exports = db;
