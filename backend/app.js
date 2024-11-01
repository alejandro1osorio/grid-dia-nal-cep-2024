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

// Variables de caché en memoria
let institucionesCache = null;
let institucionesCacheExpiration = 0;
const CACHE_DURATION = process.env.CACHE_DURATION || 3600000; // Duración del caché en milisegundos (por defecto 1 hora)

// Endpoint para obtener los datos de las instituciones con caché en memoria
app.get('/api/instituciones', async (req, res) => {
  try {
    const now = Date.now();

    // Verificar si el caché existe y no ha expirado
    if (institucionesCache && institucionesCacheExpiration > now) {
      console.log('Datos obtenidos desde el caché en memoria');
      return res.json(institucionesCache);
    }

    // Si el caché no existe o ha expirado, consulta a MongoDB
    const instituciones = await Institucion.find();

    // Actualizar el caché en memoria y establecer la nueva expiración
    institucionesCache = instituciones;
    institucionesCacheExpiration = now + CACHE_DURATION;

    console.log('Datos obtenidos desde MongoDB y almacenados en el caché en memoria');
    res.json(instituciones);
  } catch (error) {
    console.error('Error al obtener las instituciones', error);
    res.status(500).json({ message: 'Error al obtener las instituciones' });
  }
});

// Endpoint para crear una nueva institución y limpiar el caché
app.post('/api/instituciones', async (req, res) => {
  try {
    const nuevaInstitucion = new Institucion(req.body);
    await nuevaInstitucion.save();

    // Limpiar el caché cuando se actualicen los datos
    institucionesCache = null;
    institucionesCacheExpiration = 0;

    console.log('Nueva institución creada. Caché en memoria eliminado.');
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
