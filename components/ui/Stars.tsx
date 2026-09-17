export function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${count} de 5 estrellas`}>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-accent" aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.6 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
