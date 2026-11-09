// Arma tu Crêpe: estados de los botones, contadores, indicaciones y precio en vivo.

import { CATEGORIAS, type CategoriaId } from '../data/builder';
import {
  alternar,
  cotizar,
  estadoInicial,
  fijarNieve,
  formatoMXN,
  indicacion,
  puedeAgregar,
  textoFaltantes,
  type Estado,
} from '../lib/pricing';
import type { Dock } from './dock';

export function iniciarArma(dock: Dock) {
  const raiz = document.getElementById('panel-arma');
  if (!raiz) return;

  let estado: Estado = estadoInicial();
  const anuncio = document.getElementById('anuncio')!;
  const chips = [...raiz.querySelectorAll<HTMLButtonElement>('.chip')];
  const interruptor = document.getElementById('nieve') as HTMLButtonElement | null;
  const cantidadNieve = document.getElementById('nieve-cantidad');
  let temporizador = 0;
  let primerPintado = true;

  function pintar() {
    for (const chip of chips) {
      const cat = CATEGORIAS.find((c) => c.id === chip.dataset.cat)!;
      const elegido = estado.seleccion[cat.id].includes(chip.dataset.opcion!);
      chip.setAttribute('aria-pressed', String(elegido));
      const bloqueado = !elegido && !puedeAgregar(estado, cat);
      if (bloqueado) chip.setAttribute('aria-disabled', 'true');
      else chip.removeAttribute('aria-disabled');
    }
    for (const cat of CATEGORIAS) {
      const n = estado.seleccion[cat.id].length;
      const cuenta = raiz!.querySelector<HTMLElement>(`[data-cuenta="${cat.id}"]`)!;
      cuenta.textContent = `${n}/${cat.max}`;
      cuenta.classList.toggle('grupo__cuenta--lista', n >= cat.min);
      raiz!.querySelector<HTMLElement>(`[data-ayuda="${cat.id}"]`)!.textContent = indicacion(estado, cat);
    }
    if (interruptor) interruptor.setAttribute('aria-checked', String(estado.nieve > 0));
    if (cantidadNieve) cantidadNieve.textContent = String(estado.nieve);

    const c = cotizar(estado);
    const extras = c.extras.map((x) => `${x.concepto} +${formatoMXN(x.monto)}`).join(', ');
    const detalle = c.completa
      ? extras ? `Lista. Extras: ${extras}` : 'Lista, sin extras'
      : [textoFaltantes(c.faltantes), extras && `Extras: ${extras}`].filter(Boolean).join('. ');
    dock.precio(formatoMXN(c.total), detalle);

    // Anuncio para lectores de pantalla (agrupado para no saturar).
    if (!primerPintado) {
      clearTimeout(temporizador);
      temporizador = window.setTimeout(() => {
        anuncio.textContent = `Total estimado ${formatoMXN(c.total)}. ${c.completa ? 'Crepa completa.' : textoFaltantes(c.faltantes) + '.'}`;
      }, 350);
    }
    primerPintado = false;
  }

  raiz.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const chip = t.closest<HTMLButtonElement>('.chip');
    if (chip) {
      const cat = CATEGORIAS.find((c) => c.id === (chip.dataset.cat as CategoriaId))!;
      if (chip.getAttribute('aria-disabled') === 'true') {
        anuncio.textContent = `Máximo ${cat.max} ${cat.plural}. Quita una opción para cambiarla.`;
        chip.classList.remove('chip--rebote');
        void chip.offsetWidth;
        chip.classList.add('chip--rebote');
        return;
      }
      estado = alternar(estado, cat, chip.dataset.opcion!);
      return pintar();
    }
    if (t.closest('#nieve')) {
      estado = fijarNieve(estado, estado.nieve > 0 ? 0 : 1);
      return pintar();
    }
    const paso = t.closest<HTMLElement>('[data-nieve]');
    if (paso) {
      estado = fijarNieve(estado, estado.nieve + Number(paso.dataset.nieve));
      return pintar();
    }
    if (t.closest('#reiniciar')) {
      estado = estadoInicial();
      pintar();
      anuncio.textContent = 'Selección reiniciada. Total estimado ' + formatoMXN(cotizar(estado).total) + '.';
    }
  });

  pintar();
}
