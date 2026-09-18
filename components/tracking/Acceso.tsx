import { Logotipo } from "@/components/brand/Logotipo";

/**
 * Puerta del panel. También es la pantalla que se ve cuando el panel está bien
 * pero le falta configuración: en los dos casos el mensaje tiene que decir qué
 * hacer, no sólo que algo no anda.
 */
export function Acceso({ error = false, mensaje }: { error?: boolean; mensaje?: string }) {
  return (
    <main className="tono-blanco flex min-h-screen items-center justify-center bg-tono px-6 text-texto">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Logotipo tone="oscuro" className="text-[1.125rem]" />

        {mensaje ? (
          <p className="text-[0.9375rem]">{mensaje}</p>
        ) : (
          <form action="/api/tracking/login" method="post" className="flex flex-col gap-4">
            <label htmlFor="clave" className="dato">
              Contraseña del panel
            </label>
            <input
              id="clave"
              name="clave"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
              className="w-full rounded-pieza border border-linea bg-blanco px-4 py-3 text-cuerpo text-negro outline-none focus:border-brasa focus:ring-2 focus:ring-brasa/20"
            />

            {error && (
              <p role="alert" className="text-[0.875rem] text-anotacion">
                Contraseña incorrecta.
              </p>
            )}

            <button
              type="submit"
              className="rounded-cta bg-naranja px-6 py-3 font-data text-[0.8125rem] font-semibold uppercase tracking-dato text-negro transition-colors hover:bg-brasa hover:text-blanco"
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
