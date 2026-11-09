// Pestañas accesibles (patrón WAI-ARIA Tabs, activación automática).

export function iniciarPestanas(alCambiar: (panelId: string) => void) {
  const lista = document.querySelector<HTMLElement>('[role="tablist"]');
  if (!lista) return;
  const tabs = [...lista.querySelectorAll<HTMLButtonElement>('[role="tab"]')];

  function activar(tab: HTMLButtonElement, enfocar = false) {
    for (const t of tabs) {
      const activa = t === tab;
      t.setAttribute('aria-selected', String(activa));
      t.tabIndex = activa ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls')!);
      if (panel) panel.hidden = !activa;
    }
    if (enfocar) tab.focus();
    const panelId = tab.getAttribute('aria-controls')!;
    alCambiar(panelId);
    // Si el usuario ya bajó, regresa al inicio del menú (las pestañas quedan arriba).
    // Se mide desde <main>, porque la barra de pestañas es "sticky" y su posición cambia.
    const inicio = document.getElementById('menu')!.offsetTop;
    if (window.scrollY > inicio) window.scrollTo({ top: inicio, behavior: 'instant' as ScrollBehavior });
  }

  lista.addEventListener('click', (e) => {
    const tab = (e.target as HTMLElement).closest<HTMLButtonElement>('[role="tab"]');
    if (tab) activar(tab);
  });

  lista.addEventListener('keydown', (e) => {
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    let j = -1;
    if (e.key === 'ArrowRight') j = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = tabs.length - 1;
    if (j >= 0) {
      e.preventDefault();
      activar(tabs[j], true);
    }
  });
}
