# Vainilla Crêpe — menú digital

Sitio de una sola página, pensado para abrirse desde el QR del carrito.
Hecho con Vite + TypeScript, sin frameworks. El JS pesa unos 4 KB comprimido.

## Cómo verlo en tu computadora

```bash
npm install        # solo la primera vez
npm run dev        # abre http://localhost:5173 (con recarga automática)
```

Para verlo en tu celular, conéctalo al mismo Wi-Fi y abre la dirección "Network"
que aparece en la terminal (por ejemplo `http://192.168.x.x:5173`).

Versión final optimizada:

```bash
npm run build      # genera la carpeta dist/ (lista para publicar)
npm run preview    # sirve dist/ en http://localhost:4173
npm test           # pruebas de precios de "Arma tu Crêpe"
```

## Qué editar para cambiar cosas

| Quiero cambiar…                         | Archivo                     |
|-----------------------------------------|-----------------------------|
| Nombres, precios o ingredientes         | `src/data/menu.ts`          |
| Opciones, límites o precios de Arma tu Crêpe | `src/data/builder.ts`  |
| WhatsApp, teléfono, redes, dirección, horario | `src/data/site.config.ts` |
| Colores                                 | `src/styles/tokens.css`     |

Después de editar, vuelve a correr `npm run build`.

**Contacto:** todo lo que esté en `null` en `site.config.ts` no se muestra.
En cuanto pongas el número de WhatsApp o de teléfono, aparece la barra de contacto
abajo. El horario solo se muestra si `horarioConfirmado` está en `true`.

**Nieve extra:** está como un interruptor de una porción (+$20). Para permitir
varias, cambia `NIEVE.max` en `builder.ts` y se convierte en contador − / +.

## Fotos

- Los PNG originales están en `assets-src/` y nunca se modifican.
- Para cambiar una foto: reemplaza el PNG en `assets-src/fotos/` con el mismo nombre
  y corre `npm run images` (tarda ~1 minuto). Se generan AVIF y WebP en 480/800/1200 px.
- Las fotos se muestran con el arco de la marca en las esquinas superiores (16 %).
  Todas las fotos actuales toleran hasta 18 % sin cortar el cono ni el papel.
  Si una foto nueva tiene el papel muy pegado a las esquinas, baja `--arco` en `tokens.css`.

## Publicar

Publicado en GitHub Pages: https://hectorvar08.github.io/vainilla-crepe/
(repositorio `hectorvar08/vainilla-crepe`).

Para publicar cambios: `npm run publicar`. Corre las pruebas, construye `dist/`
y la sube a la rama `gh-pages`; en uno o dos minutos se ve en línea.
El código fuente va en la rama `main` (súbelo con `git push` como respaldo).
Las rutas son relativas (`base: './'`), así que funciona igual en una subcarpeta o en un dominio propio.
Al tener dominio, ponlo en `dominio` de `site.config.ts` para que las vistas previas
en WhatsApp/Facebook muestren la foto correctamente.

## Pendientes (datos que no se inventaron)

- Número de WhatsApp y de llamadas
- Instagram, TikTok, Facebook
- Dirección y enlace de Google Maps
- Horario confirmado (propuesta: L–J 5–11 p. m.; V–D 5 p. m.–12 a. m.)
- Dominio propio (el hosting ya está en GitHub Pages)
- Logo independiente (SVG o PNG transparente). Por ahora el logo se recorta de `Logo-inicial.png`
