// Arma tu Crêpe — opciones y reglas de precio.
// Todo lo que cambia el precio vive aquí. La lógica está en src/lib/pricing.ts.

export type CategoriaId = 'bases' | 'frutas' | 'toppings';

export interface Categoria {
  id: CategoriaId;
  titulo: string;
  singular: string; // "base", "fruta", "topping"
  plural: string;
  femenino: boolean; // para escribir "1 base más" / "1 topping más" / "3.ª" vs "3.er"
  min: number; // mínimo para que la crepa esté completa
  max: number; // máximo que se puede elegir
  incluidos: number; // cuántos entran en el precio base
  precioExtra: number; // costo de cada uno arriba de `incluidos`
  opciones: string[];
}

export const PRECIO_BASE = 130;

export const CATEGORIAS: Categoria[] = [
  {
    id: 'bases',
    titulo: 'Bases',
    singular: 'base',
    plural: 'bases',
    femenino: true,
    min: 1,
    max: 2,
    incluidos: 2,
    precioExtra: 0,
    opciones: [
      'Nutella',
      'Lechera',
      'Dulce de leche',
      'Philadelphia',
      'Crema batida',
      'Salsa de frutos rojos',
      'Crema Lotus',
      'Crema de pistache',
    ],
  },
  {
    id: 'frutas',
    titulo: 'Frutas',
    singular: 'fruta',
    plural: 'frutas',
    femenino: true,
    min: 2,
    max: 3,
    incluidos: 2,
    precioExtra: 15,
    opciones: ['Fresa', 'Plátano', 'Durazno en almíbar', 'Kiwi', 'Blueberry', 'Frambuesa'],
  },
  {
    id: 'toppings',
    titulo: 'Toppings',
    singular: 'topping',
    plural: 'toppings',
    femenino: false,
    min: 2,
    max: 3,
    incluidos: 2,
    precioExtra: 15,
    opciones: [
      'Cacahuate triturado',
      'Mini marshmallows',
      'Coco rallado',
      'Galleta Oreo',
      'Almendra',
      'Nuez',
      'Avellana triturada',
      'Galleta Lotus',
    ],
  },
];

// Nieve extra: confirmado +$20, una sola porción (interruptor).
// Para permitir varias porciones: cambia `max` (p. ej. a 3) y la interfaz
// mostrará un contador − / + en lugar del interruptor.
export const NIEVE = {
  etiqueta: 'Nieve extra',
  precio: 20,
  max: 1,
};
