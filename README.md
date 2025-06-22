# MVP Schematic

Esquema base funcional para Angular CLI con estructura MVP.

---

## Configuración tras la instalación

### Español

1. **Instala el paquete en tu proyecto Angular:**

   ```sh
   npm install mvp-schematic
   ```

2. **Ejecuta el comando de configuración para copiar el generador y agregar el script:**

   ```sh
   npx mvp-schematic postinstall
   ```

   Esto creará la carpeta `scripts` (si no existe), copiará el archivo `generate-mvp.js` y agregará el script `generate:mvp` en tu `package.json`.

3. **Usa el generador interactivo:**

   ```sh
   npm run generate:mvp
   ```

---

### English

1. **Install the package in your Angular project:**

   ```sh
   npm install mvp-schematic
   ```

2. **Run the setup command to copy the generator and add the script:**

   ```sh
   npx mvp-schematic postinstall
   ```

   This will create the `scripts` folder (if it doesn't exist), copy the `generate-mvp.js` file, and add the `generate:mvp` script to your `package.json`.

3. **Use the interactive generator:**

   ```sh
   npm run generate:mvp
   ```

