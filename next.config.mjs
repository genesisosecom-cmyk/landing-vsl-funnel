/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * `/agenda` era la otra variante del A/B. Se dio de baja, pero la ruta no
   * puede devolver 404: quedó en el historial de los navegadores, en los
   * públicos de retargeting y en cualquier link que se haya compartido. Manda a
   * la landing con los parámetros intactos —Next los reenvía solo— así que el
   * que llega ahí igual puede convertir.
   *
   * 307 y no 308 a propósito: un permanente lo cachean el navegador y el CDN
   * para siempre, y si algún día se vuelve a probar un flujo de agenda, ese
   * redirect queda clavado en máquinas que no controlamos.
   */
  async redirects() {
    return [{ source: "/agenda", destination: "/formulario", permanent: false }];
  },
};

export default nextConfig;
