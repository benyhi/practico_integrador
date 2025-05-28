const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../database/users.json');

function leerUsuarios() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function guardarUsuarios(usuarios) {
  fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2), 'utf-8');
}

// Obtener todos los usuarios
exports.getAll = (req, res) => {
  const usuarios = leerUsuarios();
  res.json(usuarios);
};

// Obtener un usuario por ID
exports.getById = (req, res) => {
  const usuarios = leerUsuarios();
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  res.json(usuario);
};

// Crear un nuevo usuario
exports.create = (req, res) => {
  const usuarios = leerUsuarios();
  const { nombre, email, edad } = req.body;

  const nuevoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nombre,
    email,
    edad: parseInt(edad)
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);
  res.status(201).json(nuevoUsuario);
};

// Actualizar un usuario existente
exports.update = (req, res) => {
  const usuarios = leerUsuarios();
  const { id } = req.params;
  const { nombre, email, edad } = req.body;

  const index = usuarios.findIndex(u => u.id === parseInt(id));
  if (index === -1) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

  usuarios[index] = {
    ...usuarios[index],
    nombre: nombre ?? usuarios[index].nombre,
    email: email ?? usuarios[index].email,
    edad: edad !== undefined ? parseInt(edad) : usuarios[index].edad
  };

  guardarUsuarios(usuarios);
  res.json(usuarios[index]);
};

// Eliminar un usuario
exports.delete = (req, res) => {
  const usuarios = leerUsuarios();
  const { id } = req.params;

  const index = usuarios.findIndex(u => u.id === parseInt(id));
  if (index === -1) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

  const eliminado = usuarios.splice(index, 1);
  guardarUsuarios(usuarios);
  res.json({ mensaje: 'Usuario eliminado', usuario: eliminado[0] });
};
