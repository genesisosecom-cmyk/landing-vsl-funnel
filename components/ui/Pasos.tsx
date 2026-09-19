type Paso = { titulo: string; texto: string };

/**
 * Los pasos de lo que viene después de convertir.
 *
 * Numerados y con la línea que los une, para que se lea como una secuencia y
 * no como tres avisos sueltos.
 */
export function Pasos({ pasos }: { pasos: readonly Paso[] }) {
  return (
    <ol className="mx-auto flex w-full max-w-[520px] flex-col gap-6 text-left">
      {pasos.map((paso, i) => (
        <li key={paso.titulo} className="flex gap-5">
          <div className="flex flex-col items-center">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-naranja font-data text-[0.8125rem] font-semibold text-negro">
              {i + 1}
            </span>
            {/* La línea baja hasta el paso siguiente; el último no la lleva. */}
            {i < pasos.length - 1 && <span aria-hidden="true" className="mt-2 w-px flex-1 bg-linea" />}
          </div>

          <div className="flex flex-col gap-1 pb-2">
            <h2 className="font-sans text-[1.0625rem] font-medium text-titulo">{paso.titulo}</h2>
            <p className="text-[0.9375rem] leading-relaxed text-texto">{paso.texto}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
