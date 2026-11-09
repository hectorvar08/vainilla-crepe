// Menú oficial — Signature Crêpes.
// Para cambiar un precio o un texto, edita aquí y vuelve a construir el sitio.
// `foto` es el slug de la imagen en public/img/ (ver scripts/optimize-images.mjs).

export interface Crepa {
  id: string;
  nombre: string;
  precio: number; // MXN
  ingredientes: string; // texto oficial, tal cual
  foto: string;
}

export const MENU: Crepa[] = [
  {
    id: 'banana-caramel',
    nombre: 'Banana Caramel',
    precio: 155,
    ingredientes: 'Dulce de leche, plátano, nuez, crema batida, helado de vainilla, caramelo.',
    foto: 'banana-caramel',
  },
  {
    id: 'frutos-rojos',
    nombre: 'Frutos Rojos',
    precio: 155,
    ingredientes: 'Philadelphia, mora, crema batida, helado de vainilla, salsa de frutos rojos.',
    foto: 'frutos-rojos',
  },
  {
    id: 'strawberry-cream',
    nombre: 'Strawberry Cream',
    precio: 145,
    ingredientes: 'Crema batida, fresa, helado de vainilla, salsa de fresa, Pocky de fresa.',
    foto: 'strawberry-cream',
  },
  {
    id: 'chocolate-avellana',
    nombre: 'Chocolate y Avellana',
    precio: 165,
    ingredientes: 'Nutella, crema batida, avellana, chunks de chocolate, Pocky, chocolate negro.',
    foto: 'chocolate-avellana',
  },
  {
    id: 'tropical',
    nombre: 'Tropical',
    precio: 165,
    ingredientes:
      'Crema batida, fresa, plátano, mango, durazno, chunks de chocolate semiamargo, helado de vainilla, lechera.',
    foto: 'tropical',
  },
  {
    id: 'fresa-platano',
    nombre: 'Fresa & Plátano',
    precio: 145,
    ingredientes: 'Nutella, crema batida, plátano, fresa, almendra, lechera y chocolate.',
    foto: 'fresa-platano',
  },
  {
    id: 'apple-pie',
    nombre: 'Apple Pie',
    precio: 155,
    ingredientes: 'Dulce de leche, manzana con canela, crumble de galleta, crema batida, caramelo.',
    foto: 'apple-pie',
  },
  {
    id: 'cookies-cream',
    nombre: 'Cookies & Cream',
    precio: 155,
    ingredientes:
      'Philadelphia, Oreo, crema batida, helado de vainilla, chocolate blanco, Oreo triturada.',
    foto: 'cookies-cream',
  },
];
