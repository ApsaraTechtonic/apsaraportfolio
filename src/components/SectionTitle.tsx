const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8 flex items-center gap-3">
    <span className="w-8 h-[2px] bg-primary" />
    {children}
  </h2>
);

export default SectionTitle;
