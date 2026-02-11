// Añade estos endpoints a tu backend existente

// Almacenamiento de datos de servidores
const nexusServers = new Map();

// ✅ Endpoint para recibir datos del bot
app.post("/nexus/update-server", (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autorizado" });
  }
  
  const token = authHeader.split(" ")[1];
  const SECRET = process.env.BOT_SECRET || "espanoletes_super_secret_123";
  
  if (token !== SECRET) {
    return res.status(403).json({ error: "Token inválido" });
  }

  const data = req.body;
  
  if (!data.botId || !data.serverName) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  nexusServers.set(data.botId, {
    ...data,
    lastUpdate: Date.now()
  });

  console.log(`✅ Datos Nexus actualizados: ${data.serverName} - ${data.memberCount} miembros`);
  
  res.json({ 
    success: true, 
    message: "Datos actualizados correctamente" 
  });
});

// ✅ Endpoint para que Lovable consulte todos los servidores
app.get("/nexus/servers", (req, res) => {
  // Permitir CORS para Lovable
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  
  const servers = Array.from(nexusServers.values());
  res.json({
    count: servers.length,
    servers: servers
  });
});

// ✅ Endpoint para obtener un servidor específico
app.get("/nexus/server/:botId", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  
  const { botId } = req.params;
  const data = nexusServers.get(botId);
  
  if (!data) {
    return res.status(404).json({ error: "Bot no encontrado" });
  }
  
  res.json(data);
});

// ✅ Limpiar datos antiguos cada minuto
setInterval(() => {
  const now = Date.now();
  for (const [botId, data] of nexusServers.entries()) {
    if (now - data.lastUpdate > 120000) { // 2 minutos sin actualizar
      console.log(`⚠️ Eliminando datos antiguos de bot ${botId}`);
      nexusServers.delete(botId);
    }
  }
}, 60000);
