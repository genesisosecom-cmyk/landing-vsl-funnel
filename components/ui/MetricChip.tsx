export function MetricChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg border border-hairline bg-mint/60 px-4 py-2.5">
      <span className="font-display text-[0.7rem] uppercase tracking-label text-body">{label}</span>
      <span className="font-display text-base text-accent-ink">{value}</span>
    </div>
  );
}
