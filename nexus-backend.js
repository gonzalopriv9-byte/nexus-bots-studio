require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Para servir tu HTML

// Almacenamiento en memoria de los datos de servidores
const serverData = new Map();

// Secret para autenticación
const NEXUS_SECRET = process.env.NEXUS_SECRET || "espanoletes_super_secret_123";

// ✅ Endpoint para recibir datos del bot
app.post("/api/update-server", (req, res) => {
  const authHeader = req.headers.authorization;
  
  // Verificar autenticación
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autorizado" });
  }
  
  const token = authHeader.split(" ")[1];
  if (token !== NEXUS_SECRET) {
    return res.status(403).json({ error: "Token inválido" });
  }

  const data = req.body;
  
  // Validar datos mínimos
  if (!data.botId || !data.serverName) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  // Guardar datos
  serverData.set(data.botId, {
    ...data,
    lastUpdate: Date.now()
  });

  console.log(`✅ Datos actualizados para bot ${data.botName}: ${data.memberCount} miembros`);
  
  res.json({ 
    success: true, 
    message: "Datos actualizados correctamente" 
  });
});

// ✅ Endpoint para obtener datos de todos los servidores
app.get("/api/servers", (req, res) => {
  const servers = Array.from(serverData.values());
  res.json({
    count: servers.length,
    servers: servers
  });
});

// ✅ Endpoint para obtener datos de un bot específico
app.get("/api/server/:botId", (req, res) => {
  const { botId } = req.params;
  const data = serverData.get(botId);
  
  if (!data) {
    return res.status(404).json({ error: "Bot no encontrado" });
  }
  
  res.json(data);
});

// ✅ Limpiar datos antiguos (más de 2 minutos sin actualizar)
setInterval(() => {
  const now = Date.now();
  for (const [botId, data] of serverData.entries()) {
    if (now - data.lastUpdate > 120000) { // 2 minutos
      console.log(`⚠️ Eliminando datos antiguos de bot ${botId}`);
      serverData.delete(botId);
    }
  }
}, 60000); // Cada minuto

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "online",
    servers: serverData.size,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend de Nexus corriendo en puerto ${PORT}`);
});
