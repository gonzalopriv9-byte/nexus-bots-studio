import { motion } from "framer-motion";
import CountUp from "react-countup";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  color: "cyan" | "purple" | "green" | "amber";
  delay?: number;
}

const colorMap = {
  cyan: {
    border: "border-glow-cyan/30",
    glow: "shadow-[0_0_30px_hsl(185_80%_55%/0.15)]",
    text: "text-glow-cyan",
    icon: "text-primary",
    bg: "from-primary/10 to-transparent",
    pulse: "bg-primary/20",
  },
  purple: {
    border: "border-glow-purple/30",
    glow: "shadow-[0_0_30px_hsl(270_60%_55%/0.15)]",
    text: "text-glow-purple",
    icon: "text-secondary",
    bg: "from-secondary/10 to-transparent",
    pulse: "bg-secondary/20",
  },
  green: {
    border: "border-emerald-500/30",
    glow: "shadow-[0_0_30px_hsl(160_80%_45%/0.15)]",
    text: "",
    icon: "text-emerald-400",
    bg: "from-emerald-500/10 to-transparent",
    pulse: "bg-emerald-500/20",
  },
  amber: {
    border: "border-amber-500/30",
    glow: "shadow-[0_0_30px_hsl(40_90%_55%/0.15)]",
    text: "",
    icon: "text-amber-400",
    bg: "from-amber-500/10 to-transparent",
    pulse: "bg-amber-500/20",
  },
};

const StatsCard = ({ icon: Icon, label, value, suffix = "", color, delay = 0 }: StatsCardProps) => {
  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, type: "spring", bounce: 0.3 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`relative overflow-hidden rounded-2xl border ${c.border} ${c.glow} backdrop-blur-xl bg-card/40 p-6 group cursor-default`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${c.bg} opacity-50`} />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, transparent, hsla(185, 80%, 55%, 0.1), transparent)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className={`p-3 rounded-xl ${c.pulse}`}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className={`w-7 h-7 ${c.icon}`} />
          </motion.div>
        </div>
        
        <div className={`text-4xl font-display font-bold mb-1 ${c.icon}`}>
          <CountUp end={value} duration={2.5} separator="," suffix={suffix} />
        </div>
        
        <p className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

export default StatsCard;
