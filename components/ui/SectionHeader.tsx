interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: "center" | "left";
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  light = false,
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      <span
        className={`text-xs font-semibold uppercase tracking-widest ${
          light ? "text-sunaz-gold" : "text-sunaz-gold"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-sunaz-green"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg ${
            light ? "text-white/70" : "text-sunaz-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
      {align === "center" && (
        <div className="mx-auto mt-4 h-0.5 w-16 bg-sunaz-gold" />
      )}
    </div>
  );
}
