const express = require('express');
const routerUsuarios = require('./routes/user.controller');
const routerBootcamps = require('./routes/bootcamp.controller');
const PORT = 3000;

const app = express();

//STATICS: CONFIGURACIÓN
app.use("/static", express.static("static"));

//MIDDLEWARES: MANEJO DE FORMULARIOS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//RUTAS
app.use(routerUsuarios);
app.use(routerBootcamps);

//PUERTO
app.listen(PORT, () =>
  console.log(`Servidor ejecutándose en el puerto ${PORT}`)
);
