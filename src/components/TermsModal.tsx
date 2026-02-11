import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const TERMS = `TÉRMINOS Y CONDICIONES DE NEXUSBOTSTUDIO

Última actualización: 11/02/2025

Al contratar, utilizar o permitir el uso de cualquier bot desarrollado por NexusBotstudio, el cliente acepta íntegramente los presentes Términos y Condiciones.

1. Identidad del servicio

NexusBotstudio es un equipo independiente dedicado al desarrollo, mantenimiento y gestión de bots para la plataforma Discord.

2. Aceptación de las condiciones

La incorporación de un bot de NexusBotstudio a un servidor de Discord implica la aceptación total y sin reservas de estos Términos y Condiciones.

3. Recopilación y uso de datos

El cliente acepta expresamente que:

Todos los correos electrónicos recopilados por NexusBotstudio, ya sea de forma directa o indirecta, podrán ser utilizados, almacenados y tratados para mejorar la experiencia de rol.

4. Publicidad dentro del servidor

Al disponer de un bot de NexusBotstudio en su servidor, el cliente concede a NexusBotstudio:

Libertad absoluta para realizar publicidad, promociones, anuncios o mensajes informativos dentro del servidor.

Esta publicidad podrá realizarse mediante mensajes automáticos, embeds, menciones, canales o cualquier otro medio que el bot permita.

El cliente renuncia a cualquier reclamación relacionada con la frecuencia, contenido o formato de dicha publicidad.

5. Permisos y rol de administrador

Para garantizar una correcta gestión, funcionamiento y mantenimiento del bot:

El cliente está obligado a otorgar al bot de NexusBotstudio el rol de Administrador dentro del servidor.

NexusBotstudio no se hace responsable de problemas derivados de la negativa a conceder dicho rol.

El bot podrá realizar cualquier acción permitida por los permisos otorgados.

6. Limitación de responsabilidad

NexusBotstudio no se hace responsable de:

Sanciones, bloqueos o eliminaciones del servidor por parte de Discord.

Pérdida de datos, conflictos internos del servidor o mal uso del bot.

Daños directos o indirectos derivados del uso del servicio.

7. Modificaciones

NexusBotstudio se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento sin previo aviso.

8. Aceptación final

El uso continuado del bot implica la aceptación permanente de los presentes términos.`;

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

const TermsModal = ({ open, onClose }: TermsModalProps) => {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[80vh] rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>
        <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
          {TERMS}
        </pre>
      </motion.div>
    </motion.div>
  );
};

export default TermsModal;
