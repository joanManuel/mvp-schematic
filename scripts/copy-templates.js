const fse = require('fs-extra');
const path = require('path');

const src = path.resolve(__dirname, '../src/mvp-schematic/files');
const dest = path.resolve(__dirname, '../dist/mvp-schematic/files');

// Borrar el contenido de la carpeta dist antes de copiar
fse.removeSync(dest);
console.log('🗑️ Contenido de dist eliminado.');

fse.copySync(src, dest);
console.log('✅ Archivos de plantillas copiados a dist.');