export function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent-50 px-4 py-1.5 font-display text-xs uppercase tracking-label text-accent-ink">
      {children}
    </span>
  );
}
