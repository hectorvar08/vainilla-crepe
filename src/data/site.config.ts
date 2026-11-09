// Datos de contacto y del punto de venta.
//
// IMPORTANTE: deja en `null` todo lo que todavía no esté confirmado.
// Cualquier botón o enlace con valor `null` NO se muestra en el sitio.
// Después de editar, vuelve a construir el sitio (npm run build).

export interface SiteConfig {
  /** WhatsApp en formato internacional, solo dígitos. Ej. México: 52 + 10 dígitos → '526861234567' */
  whatsapp: string | null;
  /** Teléfono para llamadas, formato internacional con +. Ej. '+526861234567' */
  telefono: string | null;
  /** URLs completas de perfiles */
  instagram: string | null;
  tiktok: string | null;
  facebook: string | null;
  /** Dirección tal como se mostrará, y enlace de Google Maps */
  direccion: string | null;
  mapsUrl: string | null;
  /**
   * Horario. Solo se muestra si `horarioConfirmado` es true.
   * Propuesta SIN confirmar: lunes a jueves 17:00–23:00; viernes a domingo 17:00–00:00.
   */
  horario: { dias: string; horas: string }[];
  horarioConfirmado: boolean;
  /** Dominio final (para Open Graph y enlaces canónicos). Ej. 'https://vainillacrepe.mx' */
  dominio: string | null;
}

export const SITE: SiteConfig = {
  whatsapp: '526861547545', // 686 154 7545
  telefono: '+526861547545', // mismo número
  instagram: null,
  tiktok: null,
  facebook: null,
  direccion: null,
  mapsUrl: null,
  horario: [
    { dias: 'Lunes a jueves', horas: '5:00 p. m. – 11:00 p. m.' },
    { dias: 'Viernes a domingo', horas: '5:00 p. m. – 12:00 a. m.' },
  ],
  horarioConfirmado: true, // confirmado el 8 nov 2026
  dominio: 'https://hectorvar08.github.io/vainilla-crepe/',
};
