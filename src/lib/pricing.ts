import { CATEGORIAS, NIEVE, PRECIO_BASE, type Categoria, type CategoriaId } from '../data/builder';

export type Seleccion = Record<CategoriaId, string[]>;

export interface Estado {
  seleccion: Seleccion;
  nieve: number; // porciones de nieve extra (0…NIEVE.max)
}

export interface Extra {
  concepto: string;
  monto: number;
}

export interface Cotizacion {
  total: number;
  extras: Extra[];
  completa: boolean;
  faltantes: string[]; // p. ej. ["1 base", "2 toppings"]
}

export function estadoInicial(): Estado {
  return { seleccion: { bases: [], frutas: [], toppings: [] }, nieve: 0 };
}

const ordinal = (n: number, femenino: boolean) =>
  `${n}.${femenino ? 'ª' : n === 1 || n === 3 ? 'er' : 'º'}`;

export function cotizar(estado: Estado, categorias: Categoria[] = CATEGORIAS): Cotizacion {
  let total = PRECIO_BASE;
  const extras: Extra[] = [];
  const faltantes: string[] = [];

  for (const cat of categorias) {
    const n = estado.seleccion[cat.id].length;
    for (let i = cat.incluidos + 1; i <= n; i++) {
      if (cat.precioExtra > 0) {
        total += cat.precioExtra;
        extras.push({ concepto: `${ordinal(i, cat.femenino)} ${cat.singular}`, monto: cat.precioExtra });
      }
    }
    const falta = cat.min - n;
    if (falta > 0) faltantes.push(`${falta} ${falta === 1 ? cat.singular : cat.plural}`);
  }

  if (estado.nieve > 0) {
    const monto = NIEVE.precio * estado.nieve;
    total += monto;
    extras.push({
      concepto: estado.nieve > 1 ? `${NIEVE.etiqueta} ×${estado.nieve}` : NIEVE.etiqueta,
      monto,
    });
  }

  return { total, extras, completa: faltantes.length === 0, faltantes };
}

/** ¿Se puede agregar una opción más a la categoría? */
export function puedeAgregar(estado: Estado, cat: Categoria): boolean {
  return estado.seleccion[cat.id].length < cat.max;
}

/** Selecciona o deselecciona una opción respetando el máximo. Devuelve un estado nuevo. */
export function alternar(estado: Estado, cat: Categoria, opcion: string): Estado {
  const actual = estado.seleccion[cat.id];
  let siguiente: string[];
  if (actual.includes(opcion)) siguiente = actual.filter((o) => o !== opcion);
  else if (actual.length < cat.max) siguiente = [...actual, opcion];
  else return estado;
  return { ...estado, seleccion: { ...estado.seleccion, [cat.id]: siguiente } };
}

export function fijarNieve(estado: Estado, porciones: number): Estado {
  return { ...estado, nieve: Math.max(0, Math.min(NIEVE.max, porciones)) };
}

/** "Falta elegir 1 base, 2 frutas y 2 toppings" */
export function textoFaltantes(faltantes: string[]): string {
  if (faltantes.length === 0) return '';
  const lista =
    faltantes.length === 1
      ? faltantes[0]
      : `${faltantes.slice(0, -1).join(', ')} y ${faltantes[faltantes.length - 1]}`;
  return `Falta elegir ${lista}`;
}

/** Indicación por categoría: "Elige 1 o 2", "Elige 1 fruta más", "Puedes agregar 1 más (+$15)", "Listo". */
export function indicacion(estado: Estado, cat: Categoria): string {
  const n = estado.seleccion[cat.id].length;
  if (n < cat.min) {
    const falta = cat.min - n;
    if (n === 0)
      return cat.precioExtra === 0 && cat.max > cat.min
        ? `Elige ${cat.min} o ${cat.max}`
        : `Elige ${cat.min}`;
    return `Elige ${falta} ${falta === 1 ? cat.singular : cat.plural} más`;
  }
  if (n < cat.max) {
    const extra = n >= cat.incluidos && cat.precioExtra > 0 ? ` (+${formatoMXN(cat.precioExtra)})` : '';
    return `Puedes agregar 1 más${extra}`;
  }
  return `Máximo ${cat.max} ${cat.plural}`;
}

export const formatoMXN = (n: number) => `$${n.toLocaleString('es-MX')}`;
