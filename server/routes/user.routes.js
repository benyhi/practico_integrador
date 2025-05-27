const express = require('express');
const router = express.Router();


let users = [
  { id: 1, name: "Juan", email: "juan@mail.com" },
  { id: 2, name: "Ana", email: "ana@mail.com" },
];


router.get('/', (req, res) => {
  res.json(users);
});


router.post('/', (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});


router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(user);
});


router.delete('/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: 'Usuario eliminado' });
});


router.put('/:id', (req, res) => {
  const { name, email } = req.body;
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

  user.name = name || user.name;
  user.email = email || user.email;

  res.json(user);
});

module.exports = router;
