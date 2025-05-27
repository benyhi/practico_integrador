const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Montar la ruta
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
