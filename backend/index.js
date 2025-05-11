require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

// Array en memoria como almacenamiento temporal
let tareas = [];
let idActual = 1;

// Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
  res.json(tareas);
});

app.get('/api/tasks/:id', (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id, 10));
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  return res.json(tarea);
});

// Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
  const { titulo, desc } = req.body;
  
  if (!titulo || !desc) {
    return res.status(400).json({ error: 'Es necesario ingresar el título y la descripción' });
  }
  
  const nuevaTarea = {
    id: idActual++,
    titulo,
    desc,
    completed: false,
    creada: new Date().toLocaleString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  
  tareas.push(nuevaTarea);
  return res.status(201).json(nuevaTarea);
});

// Actualizar una tarea
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, desc, completed } = req.body;

  const tareaIndex = tareas.findIndex(t => t.id === parseInt(id, 10));
  if (tareaIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tareas[tareaIndex] = {
    ...tareas[tareaIndex],
    titulo: titulo !== undefined ? titulo : tareas[tareaIndex].titulo,
    desc: desc !== undefined ? desc : tareas[tareaIndex].desc,
    completed: completed !== undefined ? completed : tareas[tareaIndex].completed,
    creada: tareas[tareaIndex].creada
  };

  return res.json(tareas[tareaIndex]);
});

// Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tareas.findIndex(t => t.id === parseInt(id, 10));

  if (index === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tareas.splice(index, 1);
  return res.status(204).end();
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});