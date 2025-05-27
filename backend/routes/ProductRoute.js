// Rutas de productos
const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController'); // Crearemos este archivo a continuación

// Ruta para obtener todos los modelos
router.get('products/', ProductController.getAll);

// Ruta para obtener un modelo por ID
router.get('products/:id', ProductController.getById);

// Ruta para crear un nuevo modelo
router.post('products/', ProductController.create);

// Ruta para actualizar un modelo por ID
router.put('products/:id', ProductController.update);

// Ruta para eliminar un modelo por ID
router.delete('products/:id', ProductController.delete);

module.exports = router;