import { motion } from "framer-motion";
import { Bot, Swords, Shield, Wand2, Cog, MessageSquare } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "Bots Personalizados",
    description: "Diseñamos bots a medida para tu servidor de Discord con funcionalidades únicas adaptadas a tus necesidades.",
  },
  {
    icon: Swords,
    title: "Sistemas de Rol",
    description: "Mecánicas completas de juego de rol: combate, inventario, misiones, economía y mucho más.",
  },
  {
    icon: Shield,
    title: "Moderación Avanzada",
    description: "Herramientas de moderación automáticas integradas para mantener tu comunidad segura y activa.",
  },
  {
    icon: Wand2,
    title: "Automatizaciones",
    description: "Flujos automáticos para roles, bienvenidas, eventos programados y gestión de tu servidor.",
  },
  {
    icon: Cog,
    title: "Mantenimiento",
    description: "Soporte continuo, actualizaciones y optimización para que tu bot siempre funcione al máximo.",
  },
  {
    icon: MessageSquare,
    title: "Integración IA",
    description: "NPCs inteligentes con IA conversacional para experiencias de rol inmersivas e interactivas.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const ServicesSection = () => {
  return (
    <section id="servicios" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary text-glow-cyan">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Todo lo que necesitas para crear la experiencia perfecta en Discord
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:box-glow-cyan"
            >
              <div className="mb-4 inline-flex rounded-lg bg-muted p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon size={24} />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
