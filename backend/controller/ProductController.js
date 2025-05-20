// Controladores de productos

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../database/products.json');

function leerProductos() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function guardarProductos(productos) {
  fs.writeFileSync(filePath, JSON.stringify(productos, null, 2), 'utf-8');
}

// Obtener todos los productos
exports.getAll = (req, res) => {
  const productos = leerProductos();
  res.json(productos);
};

// Obtener un producto por ID
exports.getById = (req, res) => {
  const productos = leerProductos();
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.json(producto);
};

// Crear un nuevo producto
exports.create = (req, res) => {
  const productos = leerProductos();
  const { nombre, precio, stock } = req.body;

  const nuevoProducto = {
    id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
    nombre,
    precio: parseFloat(precio),
    stock: parseInt(stock)
  };

  productos.push(nuevoProducto);
  guardarProductos(productos);
  res.status(201).json(nuevoProducto);
};

// Actualizar un producto existente
exports.update = (req, res) => {
  const productos = leerProductos();
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;

  const index = productos.findIndex(p => p.id === parseInt(id));
  if (index === -1) return res.status(404).json({ mensaje: 'Producto no encontrado' });

  productos[index] = {
    ...productos[index],
    nombre: nombre ?? productos[index].nombre,
    precio: precio !== undefined ? parseFloat(precio) : productos[index].precio,
    stock: stock !== undefined ? parseInt(stock) : productos[index].stock
  };

  guardarProductos(productos);
  res.json(productos[index]);
};

// Eliminar un producto
exports.delete = (req, res) => {
  const productos = leerProductos();
  const { id } = req.params;

  const index = productos.findIndex(p => p.id === parseInt(id));
  if (index === -1) return res.status(404).json({ mensaje: 'Producto no encontrado' });

  const eliminado = productos.splice(index, 1);
  guardarProductos(productos);
  res.json({ mensaje: 'Producto eliminado', producto: eliminado[0] });
};
