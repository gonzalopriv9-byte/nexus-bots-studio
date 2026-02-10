const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="font-display text-sm font-semibold text-primary text-glow-cyan">
          NexusBots Studio
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          © {new Date().getFullYear()} NexusBots Studio. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
