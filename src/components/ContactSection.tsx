import { motion } from "framer-motion";
import { MessageCircle, Mail, Globe } from "lucide-react";

const contactLinks = [
  {
    icon: MessageCircle,
    label: "Discord",
    value: "Únete a nuestro servidor",
    href: "#",
    color: "text-primary" as const,
  },
  {
    icon: Mail,
    label: "Email",
    value: "contacto@nexusbots.studio",
    href: "mailto:contacto@nexusbots.studio",
    color: "text-secondary" as const,
  },
  {
    icon: Globe,
    label: "Web",
    value: "nexusbots.studio",
    href: "#",
    color: "text-primary" as const,
  },
];

const ContactSection = () => {
  return (
    <section id="contacto" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary text-glow-cyan">
            ¿Dónde Nos Encuentras?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Estamos listos para dar vida a tu proyecto
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/50 hover:box-glow-cyan"
            >
              <link.icon size={32} className={link.color} />
              <h3 className="font-display text-sm font-semibold text-foreground">{link.label}</h3>
              <p className="text-xs text-muted-foreground">{link.value}</p>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block rounded-2xl border border-border bg-card p-8 sm:p-12">
            <h3 className="font-display text-2xl font-bold text-foreground">
              ¿Listo para empezar?
            </h3>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              Cuéntanos tu idea y crearemos el bot perfecto para tu servidor de rol en Discord.
            </p>
            <a
              href="#"
              className="mt-6 inline-block rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
            >
              Solicitar Presupuesto
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
