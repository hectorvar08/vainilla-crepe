// Modal de detalle de cada crepa, con <dialog> nativo:
// foco atrapado y cierre con Escape (nativos), cierre con botón y clic fuera,
// scroll del fondo bloqueado y retorno del foco a la tarjeta que lo abrió.

import { MENU } from '../data/menu';
import { formatoMXN } from '../lib/pricing';
import { foto, SIZES_DETALLE } from './templates';

export function iniciarDetalle() {
  const dialogo = document.getElementById('detalle') as HTMLDialogElement | null;
  if (!dialogo || typeof dialogo.showModal !== 'function') return;

  const $ = (id: string) => document.getElementById(id)!;
  let origen: HTMLElement | null = null;

  function abrir(id: string, desde: HTMLElement) {
    const c = MENU.find((m) => m.id === id);
    if (!c) return;
    origen = desde;
    $('detalle-foto').innerHTML = foto(c.foto, `Crepa ${c.nombre}`, SIZES_DETALLE, true);
    $('detalle-titulo').textContent = c.nombre;
    $('detalle-precio').textContent = formatoMXN(c.precio);
    $('detalle-ingredientes').textContent = c.ingredientes;
    document.documentElement.classList.add('sin-scroll');
    dialogo!.showModal();
    ($('detalle-cerrar') as HTMLButtonElement).focus();
  }

  function cerrar() {
    if (dialogo!.open) dialogo!.close();
  }

  dialogo.addEventListener('close', () => {
    document.documentElement.classList.remove('sin-scroll');
    origen?.focus();
    origen = null;
  });

  // Clic en el fondo oscuro (fuera del marco) cierra.
  dialogo.addEventListener('click', (e) => {
    if (e.target === dialogo) cerrar();
  });
  $('detalle-cerrar').addEventListener('click', cerrar);

  document.addEventListener('click', (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>('[data-crepa]');
    if (t) abrir(t.dataset.crepa!, t);
  });
}
