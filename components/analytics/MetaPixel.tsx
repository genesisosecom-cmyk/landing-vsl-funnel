import Script from "next/script";
import { site } from "@/content/landing";

/**
 * Píxel de Meta.
 *
 * Meta pide pegarlo en el <head>, pero en Next el equivalente correcto es
 * next/script con strategy="afterInteractive": el script se inyecta solo, una
 * vez por carga, y no bloquea el primer render. Metido a mano en el <head> con
 * una etiqueta <script> literal, React lo volvería a ejecutar en cada
 * navegación del cliente y contaría PageView de más.
 *
 * El <noscript> va en el body, que es donde puede vivir una imagen.
 *
 * Es de servidor a propósito: así el snippet viaja en el HTML y corre mientras
 * se parsea la página. Como componente de cliente se inyectaba recién después
 * de hidratar, y el que rebota antes de que cargue el JS no contaba.
 *
 * Qué páginas lo montan lo decide el layout del grupo (landing), no esta
 * función.
 */
export function MetaPixel() {
  const id = site.tracking.metaPixelId;

  // Sin ID no se carga nada: así el pixel no corre en desarrollo si no se configura.
  if (!id) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${id}');
fbq('track', 'PageView');`}
      </Script>

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
