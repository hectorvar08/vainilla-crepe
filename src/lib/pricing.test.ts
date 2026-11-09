import { describe, expect, it } from 'vitest';
import { CATEGORIAS } from '../data/builder';
import { alternar, cotizar, estadoInicial, fijarNieve, type Estado } from './pricing';

const [BASES, FRUTAS, TOPPINGS] = CATEGORIAS;

function armar(bases: number, frutas: number, toppings: number, nieve = 0): Estado {
  let e = estadoInicial();
  BASES.opciones.slice(0, bases).forEach((o) => (e = alternar(e, BASES, o)));
  FRUTAS.opciones.slice(0, frutas).forEach((o) => (e = alternar(e, FRUTAS, o)));
  TOPPINGS.opciones.slice(0, toppings).forEach((o) => (e = alternar(e, TOPPINGS, o)));
  return fijarNieve(e, nieve);
}

describe('Arma tu Crêpe — casos obligatorios', () => {
  it.each([
    ['1 base + 2 frutas + 2 toppings', armar(1, 2, 2), 130],
    ['2 bases + 3 frutas + 2 toppings', armar(2, 3, 2), 145],
    ['2 bases + 2 frutas + 3 toppings', armar(2, 2, 3), 145],
    ['2 bases + 3 frutas + 3 toppings', armar(2, 3, 3), 160],
    ['2 bases + 3 frutas + 3 toppings + nieve', armar(2, 3, 3, 1), 180],
  ])('%s = $%s', (_, estado, esperado) => {
    const c = cotizar(estado);
    expect(c.total).toBe(esperado);
    expect(c.completa).toBe(true);
  });
});

describe('Límites y estados', () => {
  it('no permite superar los máximos (2 / 3 / 3)', () => {
    const e = armar(8, 6, 8);
    expect(e.seleccion.bases).toHaveLength(2);
    expect(e.seleccion.frutas).toHaveLength(3);
    expect(e.seleccion.toppings).toHaveLength(3);
    expect(cotizar(e).total).toBe(160);
  });

  it('la nieve extra es una sola porción de +$20', () => {
    expect(cotizar(armar(1, 2, 2, 5)).total).toBe(150);
  });

  it('permite deseleccionar', () => {
    let e = armar(2, 3, 2);
    e = alternar(e, FRUTAS, FRUTAS.opciones[0]);
    expect(e.seleccion.frutas).toHaveLength(2);
    expect(cotizar(e).total).toBe(130);
  });

  it('marca la crepa incompleta y lista lo que falta', () => {
    const c = cotizar(estadoInicial());
    expect(c.total).toBe(130);
    expect(c.completa).toBe(false);
    expect(c.faltantes).toEqual(['1 base', '2 frutas', '2 toppings']);
  });

  it('desglosa los extras', () => {
    const c = cotizar(armar(2, 3, 3, 1));
    expect(c.extras.map((x) => `${x.concepto} +${x.monto}`)).toEqual([
      '3.ª fruta +15',
      '3.er topping +15',
      'Nieve extra +20',
    ]);
  });
});
