const { Router } = require("express");
const { Usuario, Bootcamp } = require("../models/index");

const routerUsuarios = Router();

// 1. POST – Crear y guardar usuarios llamado "createUser". (OK)
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const nuevoUsuario = await Usuario.create({
      firstName,
      lastName,
      email,
    });
    res.status(201).json({ usuario: nuevoUsuario });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el usuario", message: error.message });
  }
};

// 2. GET – Obtener los Bootcamp de un usuario llamado "findUserById". (OK)
const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id, {
      include: Bootcamp,
    });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ usuario: usuario });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al encontrar el usuario", message: error.message });
  }
};

// 3. GET – Obtener todos los Usuarios incluyendo, los Bootcamp llamado "findAll".
const findAll = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: Bootcamp,
    });
    res.status(200).json({ usuarios });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al encontrar el usuario", message: error.message });
  }
};

// 4. PUT – Actualizar usuario por Id llamado "updateUserById". (OK)
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await usuario.update({
      firstName,
      lastName,
      email,
    });
    res.status(200).json({ usuario: usuario });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al modificar al usuario", message: error.message });
  }
};

// 5. DELETE – Eliminar un usuario por Id llamado "deleteUserById". (OK)
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await Usuario.destroy({
      where: { idUsuario: id },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el usuario",
      message: error.message,
    });
  }
};

//RUTAS: CONTROLADOR DE USUARIOS
routerUsuarios.post("/usuarios", createUser);
routerUsuarios.get("/usuarios/:id", findUserById);
routerUsuarios.get("/usuarios", findAll);
routerUsuarios.put("/usuarios/:id", updateUserById);
routerUsuarios.delete("/usuarios/:id", deleteUserById);

//EXPORTS
module.exports = routerUsuarios;