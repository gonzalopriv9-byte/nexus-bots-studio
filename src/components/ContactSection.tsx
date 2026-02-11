import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Copy, Check } from "lucide-react";

const contactLinks = [
  {
    icon: MessageCircle,
    label: "Discord",
    value: "Únete a nuestro servidor",
    href: "https://discord.gg/zgHk5UHSwW",
    color: "text-primary" as const,
  },
  {
    icon: Mail,
    label: "Email",
    value: "nesxusbotsudios@gmail.com",
    href: "mailto:nesxusbotsudios@gmail.com",
    color: "text-secondary" as const,
  },
];

const PLANTILLA = `·LINK DEL SERVIDOR DESDE EL QUE SE SOLICITA EL BOT [LINK]

·NOMBRE DEL FUNDADOR [NOMBRE]

·USUARIO DE DISCORD DEL FUNDADOR [USUARIO]

·NUMERO DE INTEGRANTES DE SERVIDOR [NUMERO]

·NOMBRE PARA EL BOT [NOMBRE]`;

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PLANTILLA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

        <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
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
            <button
              onClick={() => setShowTemplate(true)}
              className="mt-6 inline-block rounded-lg bg-gradient-to-r from-primary to-secondary px-8 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
            >
              Iniciar nueva era en tu servidor
            </button>
          </div>
        </motion.div>

        {/* Template Modal */}
        {showTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setShowTemplate(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl"
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Solicitar Presupuesto
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Copia esta plantilla, rellénala y envíala a{" "}
                <a href="mailto:nesxusbotsudios@gmail.com" className="text-primary underline">
                  nesxusbotsudios@gmail.com
                </a>
              </p>
              <pre className="rounded-lg bg-muted p-4 text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                {PLANTILLA}
              </pre>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-5 py-2.5 font-display text-sm font-bold text-primary-foreground transition-all hover:scale-105"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "¡Copiado!" : "Copiar plantilla"}
                </button>
                <button
                  onClick={() => setShowTemplate(false)}
                  className="rounded-lg border border-border px-5 py-2.5 text-sm text-muted-foreground transition-all hover:bg-muted"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
