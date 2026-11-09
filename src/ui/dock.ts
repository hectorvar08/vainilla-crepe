// Barra inferior fija. Un solo elemento con dos zonas:
//  · precio estimado (solo en "Arma tu Crêpe")
//  · contacto (WhatsApp / Llamar, solo si hay datos en site.config)
// En "Arma tu Crêpe" el contacto se reduce a iconos para dejar sitio al precio.
// Su altura se reserva al final de la página (--dock-h) para que nunca tape contenido.

export interface Dock {
  modo(m: 'menu' | 'arma'): void;
  precio(total: string, detalle: string): void;
}

export function iniciarDock(): Dock {
  const dock = document.getElementById('dock')!;
  const zonaPrecio = document.getElementById('dock-precio')!;
  const total = document.getElementById('total')!;
  const detalle = document.getElementById('dock-detalle')!;
  const hayContacto = dock.dataset.contacto === '1';
  const raiz = document.documentElement;

  const medir = () => raiz.style.setProperty('--dock-h', dock.hidden ? '0px' : `${dock.offsetHeight}px`);
  new ResizeObserver(medir).observe(dock);

  function modo(m: 'menu' | 'arma') {
    const arma = m === 'arma';
    zonaPrecio.hidden = !arma;
    dock.classList.toggle('dock--compacto', arma);
    dock.hidden = !arma && !hayContacto;
    medir();
  }

  modo('menu');
  return {
    modo,
    precio(t, d) {
      total.textContent = t;
      detalle.textContent = d;
    },
  };
}
