#!/bin/sh
# Construye el sitio y lo sube a GitHub Pages (rama gh-pages).
# Uso: npm run publicar
set -e
cd "$(dirname "$0")/.."
npm test
npm run build
cd dist
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="Héctor Vargas" -c user.email="336097442+hectorvar08@users.noreply.github.com" \
  commit -q -m "Publicar sitio"
git push -q -f https://github.com/hectorvar08/vainilla-crepe.git gh-pages
rm -rf .git
echo "Listo: https://hectorvar08.github.io/vainilla-crepe/ (tarda 1–2 minutos en actualizarse)"
