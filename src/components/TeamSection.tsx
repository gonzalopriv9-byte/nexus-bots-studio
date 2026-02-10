import { motion } from "framer-motion";
import { Github, Twitter } from "lucide-react";

const team = [
  {
    name: "Hasbullero",
    role: "Fundador · Desarrollo & Diseño de Bots",
    avatar: "🤖",
  },
  {
    name: "Co-Fundador",
    role: "Game Design & Sistemas de Rol",
    avatar: "⚔️",
  },
  {
    name: "Hasbullero",
    role: "Desarrollador · Backend & Automatizaciones",
    avatar: "🛠️",
  },
];

const TeamSection = () => {
  return (
    <section id="equipo" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-secondary text-glow-purple">
            Nuestro Equipo
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Apasionados por Discord y los juegos de rol
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="group flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center transition-all hover:border-secondary/50 hover:box-glow-purple"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted text-4xl animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                {member.avatar}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{member.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
