#!/usr/bin/env node

const path = require('path');

const args = process.argv.slice(2);

if (args[0] === 'postinstall') {
  require(path.join(__dirname, 'scripts', 'postinstall.js'));
} else {
  console.log('Comando no reconocido. Usa: npx mvp-schematic postinstall');
}