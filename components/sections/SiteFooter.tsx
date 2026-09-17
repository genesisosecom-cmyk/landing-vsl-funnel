import { footer, site } from "@/content/landing";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-ink">
      <div className="container-page flex flex-col gap-6 py-12 text-center">
        <span className="font-display text-sm uppercase tracking-label text-paper">
          {site.brand.name}
        </span>

        <p className="mx-auto max-w-2xl text-xs leading-relaxed text-paper/60">
          {footer.disclaimer}
        </p>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs text-paper/70 underline-offset-4 hover:text-paper hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-paper/40">
          &copy; {new Date().getFullYear()} {site.brand.name}
        </p>
      </div>
    </footer>
  );
}
