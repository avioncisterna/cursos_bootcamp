const { Router } = require("express");
const { Usuario, Bootcamp } = require("../models/index");

const routerBootcamps = Router();

// 1. POST – Crear y guardar un nuevo Bootcamp llamado "createBootcamp". (OK)
const createBootcamp = async (req, res) => {
  try {
    const { title, cue, description } = req.body;
    const nuevoBootcamp = await Bootcamp.create({
      title,
      cue,
      description,
    });
    res.status(201).json({ bootcamp: nuevoBootcamp });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el bootcamp", message: error.message });
  }
};

// 2. POST – Agregar un Usuario al Bootcamp llamado "addUserToBootcamp".
const addUserToBootcamp = async (req, res) => {
  try {
    const { idUsuario, idBootcamp } = req.params;
    const bootcamp = await Bootcamp.findByPk(idBootcamp, {
      include: [Usuario],
    });
    const usuario = await Usuario.findByPk(idUsuario);
    if (!bootcamp || !usuario) {
      return res
        .status(404)
        .json({ error: "Bootcamp o usuario no encontrado" });
    }
    await bootcamp.addUsuario(usuario);
    res.status(200).json({ usuario });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el bootcamp", message: error.message });
  }
};

// 3. GET – Obtener los Bootcamp de un usuario llamado "findUserById". (OK)
const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const bootcamp = await Bootcamp.findByPk(id, {
      include: Usuario,
    });
    if (!bootcamp) {
      return res.status(404).json({ error: "Bootcamp no encontrado" });
    }
    res.status(200).json({ bootcamp });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error al encontrar el bootcamp",
        message: error.message,
      });
  }
};

// 4. GET – Obtener todos los Usuarios incluyendo los Bootcamp llamado "findAll". (OK)
const findAll = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: Bootcamp,
    });
    res.status(200).json({ usuarios });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el usuario", message: error.message });
  }
};

// 5. PUT – Actualizar Bootcamp llamado "updateBootcampById ". (OK)
const updateBootcampById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, cue, description } = req.body;
    const bootcamp = await Bootcamp.findByPk(id);
    if (!bootcamp) {
      return res.status(404).json({ error: "Bootcamp no encontrado" });
    }
    await bootcamp.update({
      title,
      cue,
      description,
    });
    res.status(200).json({ bootcamp: bootcamp });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener al bootcamp", message: error.message });
  }
};

// 6. DELETE – Eliminar un Bootcamp por Id llamado "deleteBootcampById". (OK)
const deleteBootcampById = async (req, res) => {
  try {
    const { id } = req.params;
    const bootcamp = await Bootcamp.findByPk(id);
    if (!bootcamp) {
      return res.status(404).json({ error: "Bootcamp no encontrado" });
    }
    await Bootcamp.destroy({
      where: { idBootcamp: id },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el bootcamp",
      message: error.message,
    });
  }
};

//RUTAS: CONTROLADOR DE BOOTCAMPS
routerBootcamps.post("/bootcamps", createBootcamp);
routerBootcamps.post("/bootcamps/:idBootcamp/usuarios/:idUsuario", addUserToBootcamp);
routerBootcamps.get("/bootcamps/:id", findUserById);
routerBootcamps.get("/bootcamps", findAll);
routerBootcamps.put("/bootcamps/:id", updateBootcampById);
routerBootcamps.delete("/bootcamps/:id", deleteBootcampById);

//EXPORTS
module.exports = routerBootcamps;
