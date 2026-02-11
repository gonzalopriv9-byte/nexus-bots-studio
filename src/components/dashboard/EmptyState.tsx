import { motion } from "framer-motion";
import { Search, Radio } from "lucide-react";

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="col-span-full flex flex-col items-center justify-center py-20"
  >
    <motion.div
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className="relative mb-6"
    >
      <div className="w-24 h-24 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Radio className="w-10 h-10 text-primary/50" />
        </motion.div>
      </div>
      <motion.div
        className="absolute -top-1 -right-1"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Search className="w-6 h-6 text-secondary" />
      </motion.div>
    </motion.div>
    <h3 className="text-xl font-display font-bold text-foreground mb-2">Buscando servidores...</h3>
    <p className="text-muted-foreground text-sm max-w-md text-center">
      No se han detectado servidores activos. Los datos aparecerán automáticamente cuando un bot se conecte.
    </p>
  </motion.div>
);

export default EmptyState;
