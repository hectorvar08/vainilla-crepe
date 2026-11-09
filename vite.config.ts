import { defineConfig, type Plugin } from 'vite';
import { armaHTML, catalogoHTML, contactoHTML, visitanosHTML } from './src/ui/templates';
import { SITE } from './src/data/site.config';

// Inserta el menú, el personalizador y el contacto como HTML estático al construir.
// Así la página se ve completa al primer pintado (mejor LCP) y sin depender del JS.
function menuEstatico(): Plugin {
  return {
    name: 'vainilla-menu-estatico',
    transformIndexHtml(html) {
      const url = (p: string) => (SITE.dominio ? new URL(p, SITE.dominio).href : p);
      const contacto = contactoHTML(SITE);
      return html
        .replace('<!--CATALOGO-->', catalogoHTML())
        .replace('<!--ARMA-->', armaHTML())
        .replace('<!--VISITANOS-->', visitanosHTML(SITE))
        .replace('<!--CONTACTO-->', contacto)
        .replace('data-contacto=""', `data-contacto="${contacto ? '1' : ''}"`)
        .replace('%OG_IMAGE%', url('img/og.jpg'))
        .replace('%ANIO%', String(new Date().getFullYear()))
        .replace(
          '<!--CANONICAL-->',
          SITE.dominio
            ? `<link rel="canonical" href="${SITE.dominio}"><meta property="og:url" content="${SITE.dominio}">`
            : '',
        );
    },
  };
}

export default defineConfig({
  // Rutas relativas: la página funciona igual en la raíz o en una subcarpeta (GitHub Pages).
  base: './',
  plugins: [menuEstatico()],
  build: { target: 'es2020', cssCodeSplit: false },
  server: { host: true },
});
