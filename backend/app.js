import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();  

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.log('Error al conectar con MongoDB Atlas:', err));

const InstitucionSchema = new mongoose.Schema({
  nombreInstitucion: String,
  nombreSede: String,
  codigoDaneNit: String,
  correo: String,
  ciudad: String,
  departamento: String,
  fotos: [String],  
}, { collection: 'forms' });  // Especificar la coleccion 'forms'

const Institucion = mongoose.model('Institucion', InstitucionSchema, 'forms');

// Endpoint para obtener los datos de las instituciones
app.get('/api/instituciones', async (req, res) => {
  try {
    const instituciones = await Institucion.find();
    res.json(instituciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las instituciones' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});