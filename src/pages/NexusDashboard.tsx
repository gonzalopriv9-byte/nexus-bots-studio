import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Shield, Users, Wifi, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ParticleBackground from "@/components/dashboard/ParticleBackground";
import StatsCard from "@/components/dashboard/StatsCard";
import ServerCard from "@/components/dashboard/ServerCard";
import SyncIndicator from "@/components/dashboard/SyncIndicator";
import EmptyState from "@/components/dashboard/EmptyState";

interface ServerData {
  botId: string;
  serverName: string;
  serverIcon?: string;
  memberCount: number;
  onlineMembers: number;
  botName: string;
  botAvatar?: string;
  inviteUrl?: string;
  serverId?: string;
  createdAt?: string;
  timestamp?: number;
  lastUpdate?: number;
}

// Demo data for when API is unavailable
const DEMO_SERVERS: ServerData[] = [
  {
    botId: "demo-1",
    serverName: "Españoletes RP",
    memberCount: 1247,
    onlineMembers: 342,
    botName: "Nexus Guard",
    inviteUrl: "https://discord.gg/zgHk5UHSwW",
    serverId: "1",
  },
  {
    botId: "demo-2",
    serverName: "Gaming Elite",
    memberCount: 856,
    onlineMembers: 198,
    botName: "Nexus Music",
    inviteUrl: "https://discord.gg/zgHk5UHSwW",
    serverId: "2",
  },
  {
    botId: "demo-3",
    serverName: "Comunidad Dev",
    memberCount: 2103,
    onlineMembers: 567,
    botName: "Nexus Mod",
    inviteUrl: "https://discord.gg/zgHk5UHSwW",
    serverId: "3",
  },
];

const API_URL = import.meta.env.VITE_NEXUS_API_URL || "";

const NexusDashboard = () => {
  const [servers, setServers] = useState<ServerData[]>(DEMO_SERVERS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const [isLive, setIsLive] = useState(false);

  const fetchServers = useCallback(async () => {
    if (!API_URL) return;
    setIsSyncing(true);
    try {
      const res = await fetch(`${API_URL}/nexus/servers`);
      if (res.ok) {
        const data = await res.json();
        if (data.servers && data.servers.length > 0) {
          setServers(data.servers);
          setIsLive(true);
        }
      }
    } catch {
      // Use demo data silently
    } finally {
      setIsSyncing(false);
      setLastSync(new Date());
    }
  }, []);

  useEffect(() => {
    fetchServers();
    const interval = setInterval(fetchServers, 10000);
    return () => clearInterval(interval);
  }, [fetchServers]);

  const totalMembers = servers.reduce((sum, s) => sum + s.memberCount, 0);
  const totalOnline = servers.reduce((sum, s) => sum + s.onlineMembers, 0);
  const timeSinceSync = Math.round((Date.now() - lastSync.getTime()) / 1000);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, hsl(260 40% 8%) 0%, hsl(270 50% 12%) 30%, hsl(250 45% 10%) 60%, hsl(220 40% 8%) 100%)",
        }}
      />
      <div className="fixed inset-0 z-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, hsla(270, 60%, 30%, 0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, hsla(185, 80%, 30%, 0.3) 0%, transparent 50%)",
        }}
      />
      
      <ParticleBackground />
      <SyncIndicator isSyncing={isSyncing} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-10"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-3"
          >
            <span className="text-5xl">🚀</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradient-shift_3s_linear_infinite] bg-clip-text text-transparent">
              NEXUS COMMAND CENTER
            </span>
          </h1>
          <p className="text-muted-foreground mt-3 text-sm font-medium tracking-widest uppercase">
            {isLive ? "🟢 Datos en tiempo real" : "📡 Modo demostración"}
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatsCard icon={Shield} label="Servidores Activos" value={servers.length} color="cyan" delay={0} />
          <StatsCard icon={Users} label="Miembros Totales" value={totalMembers} color="purple" delay={0.1} />
          <StatsCard icon={Wifi} label="Usuarios Online" value={totalOnline} color="green" delay={0.2} />
          <StatsCard icon={Clock} label="Última Sync" value={timeSinceSync} suffix="s" color="amber" delay={0.3} />
        </div>

        {/* Server cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Servidores Conectados
            <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
              {servers.length}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servers.length > 0 ? (
              servers.map((server, i) => (
                <ServerCard key={server.botId} server={server} index={i} />
              ))
            ) : (
              <EmptyState />
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 pb-8"
        >
          <p className="text-xs text-muted-foreground/50 font-medium">
            NexusBotStudio Command Center • Auto-refresh cada 10s
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NexusDashboard;
