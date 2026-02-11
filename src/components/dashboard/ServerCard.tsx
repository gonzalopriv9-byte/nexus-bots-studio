import { motion } from "framer-motion";
import { Users, Wifi, ExternalLink, Bot, Rocket } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
}

interface ServerCardProps {
  server: ServerData;
  index: number;
}

const ServerCard = ({ server, index }: ServerCardProps) => {
  const onlinePercent = server.memberCount > 0
    ? Math.round((server.onlineMembers / server.memberCount) * 100)
    : 0;

  const circumference = 2 * Math.PI * 28;
  const strokeDashoffset = circumference - (onlinePercent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 * index, type: "spring", bounce: 0.25 }}
      whileHover={{ scale: 1.03, y: -8, rotateX: 2 }}
      className="group relative rounded-2xl border border-border/50 backdrop-blur-xl bg-card/30 overflow-hidden cursor-default"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"
        style={{
          boxShadow: "0 0 40px hsla(270, 60%, 55%, 0.2), 0 0 80px hsla(185, 80%, 55%, 0.1)",
        }}
      />

      {/* Banner */}
      <div className="relative h-24 bg-gradient-to-r from-secondary/40 via-primary/20 to-secondary/40 overflow-hidden">
        {server.serverIcon && (
          <img
            src={server.serverIcon}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30 blur-md scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/90" />

        {/* Online badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30">
          <motion.div
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Online</span>
        </div>
      </div>

      {/* Server icon floating */}
      <div className="flex justify-center -mt-10 relative z-10">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-[0_0_25px_hsla(40,90%,55%,0.3)]">
            {server.serverIcon ? (
              <img src={server.serverIcon} alt={server.serverName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-foreground">
                  {server.serverName.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 pt-3 space-y-4">
        {/* Server name */}
        <div className="text-center">
          <h3 className="text-lg font-display font-bold text-foreground truncate">
            {server.serverName}
          </h3>
          <div className="flex items-center justify-center gap-2 mt-1.5">
            <Bot className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-muted-foreground font-medium">{server.botName}</span>
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {/* Members */}
          <div className="rounded-xl bg-muted/40 backdrop-blur-sm p-3 border border-border/30">
            <div className="flex items-center gap-1.5 mb-2">
              <Users className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Miembros</span>
            </div>
            <p className="text-xl font-display font-bold text-foreground">{server.memberCount.toLocaleString()}</p>
            <div className="mt-2">
              <Progress value={Math.min(server.memberCount / 100, 100)} className="h-1.5 bg-muted" />
            </div>
          </div>

          {/* Online circle */}
          <div className="rounded-xl bg-muted/40 backdrop-blur-sm p-3 border border-border/30 flex flex-col items-center justify-center">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(240 12% 20%)" strokeWidth="3" />
                <motion.circle
                  cx="32" cy="32" r="28" fill="none"
                  stroke="hsl(160 80% 45%)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, delay: 0.1 * index, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Wifi className="w-3 h-3 text-emerald-400 mb-0.5" />
                <span className="text-xs font-display font-bold text-emerald-400">{onlinePercent}%</span>
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground mt-1">{server.onlineMembers.toLocaleString()} online</span>
          </div>
        </div>

        {/* Join button */}
        {server.inviteUrl && (
          <motion.a
            href={server.inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center justify-center gap-2 w-full py-3 rounded-xl font-display font-bold text-sm text-foreground overflow-hidden group/btn"
            style={{
              background: "linear-gradient(135deg, hsl(270 60% 50%), hsl(330 70% 55%))",
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(270 70% 60%), hsl(330 80% 65%))",
              }}
            />
            <motion.div
              className="relative z-10 flex items-center gap-2"
            >
              <motion.div
                animate={{ x: [0, 3, 0], y: [0, -2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Rocket className="w-4 h-4" />
              </motion.div>
              <span>UNIRSE AL SERVIDOR</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </motion.div>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

export default ServerCard;
