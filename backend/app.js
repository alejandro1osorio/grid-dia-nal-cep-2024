import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.log('Error al conectar con MongoDB Atlas:', err));

// Esquema y modelo de la institución
const InstitucionSchema = new mongoose.Schema({
  nombreInstitucion: String,
  nombreSede: String,
  codigoDaneNit: String,
  correo: String,
  ciudad: String,
  departamento: String,
  fotos: [String],
}, { collection: 'forms' });

const Institucion = mongoose.model('Institucion', InstitucionSchema, 'forms');

// ✅ Endpoint para obtener siempre los datos actualizados (sin caché)
app.get('/api/instituciones', async (req, res) => {
  try {
    const instituciones = await Institucion.find();
    console.log('Datos obtenidos directamente desde MongoDB');
    res.json(instituciones);
  } catch (error) {
    console.error('Error al obtener las instituciones', error);
    res.status(500).json({ message: 'Error al obtener las instituciones' });
  }
});

// ✅ Endpoint para crear una nueva institución
app.post('/api/instituciones', async (req, res) => {
  try {
    const nuevaInstitucion = new Institucion(req.body);
    await nuevaInstitucion.save();
    console.log('Nueva institución creada.');
    res.status(201).json(nuevaInstitucion);
  } catch (error) {
    console.error('Error al crear la institución', error);
    res.status(500).json({ message: 'Error al crear la institución' });
  }
});

// Configuración del puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
