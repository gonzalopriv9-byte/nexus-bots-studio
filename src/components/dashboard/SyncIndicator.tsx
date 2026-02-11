import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";

const SyncIndicator = ({ isSyncing }: { isSyncing: boolean }) => (
  <AnimatePresence>
    {isSyncing && (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-card/60 border border-primary/30 shadow-[0_0_20px_hsla(185,80%,55%,0.15)]"
      >
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <RefreshCw className="w-3.5 h-3.5 text-primary" />
        </motion.div>
        <span className="text-xs font-medium text-primary">Sincronizando...</span>
      </motion.div>
    )}
  </AnimatePresence>
);

export default SyncIndicator;
