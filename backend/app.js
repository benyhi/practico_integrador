const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/UserRoute');
const productRoutes = require('./routes/ProductRoute');

app.use('/', userRoutes);
app.use('/', productRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
