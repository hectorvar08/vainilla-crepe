import '@fontsource/bodoni-moda/latin-500.css';
import '@fontsource/bodoni-moda/latin-600.css';
import '@fontsource/bodoni-moda/latin-500-italic.css';
import '@fontsource/mulish/latin-400.css';
import '@fontsource/mulish/latin-600.css';
import '@fontsource/mulish/latin-700.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/componentes.css';

import { iniciarPestanas } from './ui/pestanas';
import { iniciarDetalle } from './ui/detalle';
import { iniciarArma } from './ui/arma';
import { iniciarDock } from './ui/dock';

const dock = iniciarDock();
iniciarPestanas((panel) => dock.modo(panel === 'panel-arma' ? 'arma' : 'menu'));
iniciarDetalle();
iniciarArma(dock);
