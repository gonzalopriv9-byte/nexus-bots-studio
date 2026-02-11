const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Almacenamiento de servidores
const nexusServers = new Map();
const SECRET = process.env.BOT_SECRET || "espanoletes_super_secret_123";

// ✅ API: Recibir datos del bot
app.post('/nexus/update-server', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  
  const token = authHeader.split(' ')[1];
  if (token !== SECRET) {
    return res.status(403).json({ error: 'Token inválido' });
  }

  const data = req.body;
  
  if (!data.botId || !data.serverName) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  nexusServers.set(data.botId, {
    ...data,
    lastUpdate: Date.now()
  });

  console.log(`✅ Datos actualizados: ${data.serverName} - ${data.memberCount} miembros`);
  
  res.json({ success: true, message: 'Datos actualizados' });
});

// ✅ API: Obtener todos los servidores
app.get('/nexus/servers', (req, res) => {
  const servers = Array.from(nexusServers.values());
  res.json({
    count: servers.length,
    servers: servers
  });
});

// ✅ API: Obtener un servidor específico
app.get('/nexus/server/:botId', (req, res) => {
  const { botId } = req.params;
  const data = nexusServers.get(botId);
  
  if (!data) {
    return res.status(404).json({ error: 'Bot no encontrado' });
  }
  
  res.json(data);
});

// ✅ Limpiar datos antiguos
setInterval(() => {
  const now = Date.now();
  for (const [botId, data] of nexusServers.entries()) {
    if (now - data.lastUpdate > 120000) { // 2 minutos
      console.log(`⚠️ Eliminando datos antiguos de bot ${botId}`);
      nexusServers.delete(botId);
    }
  }
}, 60000); // Cada minuto

// ✅ Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'dist')));

// ✅ Todas las rutas no API van al index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Nexus corriendo en puerto ${PORT}`);
});
