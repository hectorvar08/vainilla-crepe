// Plantillas HTML compartidas: se usan al construir el sitio (HTML estático,
// rápido y visible aunque falle el JS) y en el navegador (modal de detalle).

import { MENU, type Crepa } from '../data/menu';
import { CATEGORIAS, NIEVE, PRECIO_BASE } from '../data/builder';
import type { SiteConfig } from '../data/site.config';
import { formatoMXN } from '../lib/pricing';

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const ANCHOS = [480, 800, 1200];
const srcset = (slug: string, ext: string) =>
  ANCHOS.map((w) => `img/${slug}-${w}.${ext} ${w}w`).join(', ');

export function foto(slug: string, alt: string, sizes: string, prioritaria = false): string {
  const carga = prioritaria ? 'fetchpriority="high"' : 'loading="lazy"';
  return `<picture>
    <source type="image/avif" srcset="${srcset(slug, 'avif')}" sizes="${sizes}">
    <source type="image/webp" srcset="${srcset(slug, 'webp')}" sizes="${sizes}">
    <img src="img/${slug}-800.webp" alt="${esc(alt)}" width="1200" height="1200" decoding="async" ${carga}>
  </picture>`;
}

const SIZES_TARJETA = '(min-width: 1120px) 260px, (min-width: 1000px) 23vw, (min-width: 700px) 31vw, 47vw';
export const SIZES_DETALLE = '(min-width: 760px) 420px, 100vw';

function tarjeta(c: Crepa, i: number): string {
  return `<li>
    <button type="button" class="tarjeta" data-crepa="${c.id}" aria-haspopup="dialog">
      <span class="tarjeta__foto foto-arco">${foto(c.foto, `Crepa ${c.nombre}`, SIZES_TARJETA, i < 2)}</span>
      <span class="tarjeta__nombre">${esc(c.nombre)}</span>
      <span class="tarjeta__precio">${formatoMXN(c.precio)}</span>
      <span class="tarjeta__ingredientes">${esc(c.ingredientes)}</span>
    </button>
  </li>`;
}

export const catalogoHTML = () => `<ul class="catalogo" role="list">${MENU.map(tarjeta).join('')}</ul>`;

const ICONO_CHECK = `<svg class="chip__check" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export function armaHTML(): string {
  const grupos = CATEGORIAS.map((cat) => {
    const chips = cat.opciones
      .map(
        (o) =>
          `<button type="button" class="chip" aria-pressed="false" data-cat="${cat.id}" data-opcion="${esc(o)}">${ICONO_CHECK}<span>${esc(o)}</span></button>`,
      )
      .join('');
    const nota =
      cat.precioExtra > 0
        ? `Incluye ${cat.incluidos}. ${cat.femenino ? 'La' : 'El'} ${cat.incluidos + 1}.${cat.femenino ? 'ª' : 'er'} ${cat.singular} cuesta +${formatoMXN(cat.precioExtra)}.`
        : `Sin costo extra.`;
    return `<div class="grupo" role="group" aria-labelledby="g-${cat.id}" aria-describedby="g-${cat.id}-nota g-${cat.id}-ayuda">
      <div class="grupo__cabeza">
        <h3 id="g-${cat.id}">${cat.titulo}</h3>
        <span class="grupo__cuenta" data-cuenta="${cat.id}" aria-hidden="true">0/${cat.max}</span>
      </div>
      <p class="grupo__nota" id="g-${cat.id}-nota">${nota}</p>
      <p class="grupo__ayuda" id="g-${cat.id}-ayuda" data-ayuda="${cat.id}"></p>
      <div class="chips">${chips}</div>
    </div>`;
  }).join('');

  const nieve =
    NIEVE.max > 1
      ? `<div class="nieve nieve--contador" role="group" aria-labelledby="nieve-t">
          <span id="nieve-t" class="nieve__texto">${NIEVE.etiqueta} <span class="nieve__precio">+${formatoMXN(NIEVE.precio)} c/u</span></span>
          <span class="contador">
            <button type="button" class="contador__btn" data-nieve="-1" aria-label="Quitar nieve">−</button>
            <output id="nieve-cantidad" aria-live="polite">0</output>
            <button type="button" class="contador__btn" data-nieve="1" aria-label="Agregar nieve">+</button>
          </span>
        </div>`
      : `<button type="button" class="nieve" role="switch" aria-checked="false" id="nieve">
          <span class="nieve__texto">${NIEVE.etiqueta} <span class="nieve__precio">+${formatoMXN(NIEVE.precio)}</span></span>
          <span class="interruptor" aria-hidden="true"></span>
        </button>`;

  return `<div class="arma">
    <p class="arma__intro"><span class="arma__base">${formatoMXN(PRECIO_BASE)}</span> incluye 2 bases, 2 frutas y 2 toppings.</p>
    ${grupos}
    <div class="grupo grupo--nieve">${nieve}</div>
    <div class="arma__pie">
      <button type="button" class="boton-texto" id="reiniciar">Empezar de nuevo</button>
      <p class="arma__aviso">El precio es una estimación, no un pedido. El total se confirma al ordenar.</p>
    </div>
  </div>`;
}

// ---------- contacto ----------

const ICONO_WA = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3z"/></svg>`;
const ICONO_TEL = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M5 3.5h3.2l1.6 4.2-2 1.3a11 11 0 0 0 5.2 5.2l1.3-2 4.2 1.6V17a2.5 2.5 0 0 1-2.5 2.5A15.5 15.5 0 0 1 2.5 6 2.5 2.5 0 0 1 5 3.5z"/></svg>`;

export function contactoHTML(s: SiteConfig): string {
  const botones: string[] = [];
  if (s.whatsapp)
    botones.push(
      `<a class="contacto contacto--wa" href="https://wa.me/${esc(s.whatsapp)}" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp">${ICONO_WA}<span class="contacto__texto">WhatsApp</span></a>`,
    );
  if (s.telefono)
    botones.push(
      `<a class="contacto" href="tel:${esc(s.telefono)}" aria-label="Llamar">${ICONO_TEL}<span class="contacto__texto">Llamar</span></a>`,
    );
  return botones.join('');
}

export function visitanosHTML(s: SiteConfig): string {
  const bloques: string[] = [];
  if (s.direccion || s.mapsUrl) {
    bloques.push(`<div class="visita__bloque">
      <h3>Dónde estamos</h3>
      ${s.direccion ? `<p>${esc(s.direccion)}</p>` : ''}
      ${s.mapsUrl ? `<a class="enlace" href="${esc(s.mapsUrl)}" target="_blank" rel="noopener">Abrir en Google Maps</a>` : ''}
    </div>`);
  }
  if (s.horarioConfirmado && s.horario.length) {
    bloques.push(`<div class="visita__bloque">
      <h3>Horario</h3>
      <dl class="horario">${s.horario.map((h) => `<div><dt>${esc(h.dias)}</dt><dd>${esc(h.horas)}</dd></div>`).join('')}</dl>
    </div>`);
  }
  const redes = (
    [
      ['Instagram', s.instagram],
      ['TikTok', s.tiktok],
      ['Facebook', s.facebook],
    ] as const
  ).filter(([, url]) => url);
  if (redes.length) {
    bloques.push(`<div class="visita__bloque">
      <h3>Síguenos</h3>
      <ul class="redes" role="list">${redes.map(([n, url]) => `<li><a class="enlace" href="${esc(url!)}" target="_blank" rel="noopener">${n}</a></li>`).join('')}</ul>
    </div>`);
  }
  const contacto = contactoHTML(s);
  if (contacto) {
    bloques.push(`<div class="visita__bloque"><h3>Contacto</h3><div class="visita__contacto">${contacto}</div></div>`);
  }
  if (!bloques.length) return '';
  return `<section class="visita" aria-labelledby="visita-t">
    <h2 id="visita-t">${s.direccion || s.mapsUrl ? 'Visítanos' : 'Horario y contacto'}</h2>
    <div class="visita__rejilla">${bloques.join('')}</div>
  </section>`;
}
