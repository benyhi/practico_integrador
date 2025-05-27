// Rutas de usuarios
const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');

// Ruta para obtener todos los modelos
router.get('/user', UserController.getAll);

// Ruta para obtener un modelo por ID
router.get('/user/:id', UserController.getById);

// Ruta para crear un nuevo modelo
router.post('/user', UserController.create);

// Ruta para actualizar un modelo por ID
router.put('/user/:id', UserController.update);

// Ruta para eliminar un modelo por ID
router.delete('/user/:id', UserController.delete);

module.exports = router;