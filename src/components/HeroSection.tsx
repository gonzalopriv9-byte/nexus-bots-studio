import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-glow-cyan">
            <span className="text-primary">Nexus</span>
            <span className="text-foreground">Bots</span>
            <br />
            <span className="text-secondary">Studio</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed"
        >
          Creamos <span className="text-primary font-semibold">bots de Discord</span> y automatizaciones especializadas en{" "}
          <span className="text-secondary font-semibold">juegos de rol</span>. Lleva tu servidor al siguiente nivel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#servicios"
            className="rounded-lg bg-primary px-8 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
          >
            Nuestros Servicios
          </a>
          <a
            href="#contacto"
            className="rounded-lg border border-border px-8 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-foreground transition-all hover:border-primary hover:text-primary"
          >
            Contáctanos
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
