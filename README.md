# MVP Schematic

A functional schematic for Angular CLI to generate MVP (Model-View-Presenter) structured components, supporting both classic (NgModule) and modern (standalone) Angular approaches.

---

## Installation

Install the package in your Angular project:

```sh
npm install mvp-schematic
```

---

## Setup

After installing, run the setup command to copy the interactive generator script and add the npm script to your project:

```sh
npx mvp-schematic postinstall
```

This will:

- Create a `scripts` folder (if it doesn't exist).
- Copy the `generate-mvp.js` interactive generator script into `scripts/`.
- Add the `generate:mvp` script to your `package.json`.

---

## Usage

### Interactive Generator

Run the following command to launch the interactive MVP component generator:

```sh
npm run generate:mvp
```

You will be prompted for:

- **Component name:** Must not contain spaces or special characters.
- **Target path:** Where to generate the component (default: `src/app/features`).
- **Use Angular standalone style?** If yes, the schematic will generate standalone components and routing using the latest Angular patterns.
- **Include presenter.ts file?**
- **Include module.ts file?** (only if not standalone)
- **Include routing.ts file?**
- **Include .scss file?**

The generator will then run the schematic with your selected options.

---

### Direct Schematic Usage

You can also use the schematic directly with Angular CLI:

```sh
ng generate mvp-schematic:mvp --name=example --standalone=true --with-presenter=true --with-module=false --with-routing=true --with-styles=true --target-path='src/app/features'
```

---

## Features

- **Supports both classic (NgModule) and standalone Angular component generation.**
- **Modern routing:** When using standalone, generates routes as `export default [] as Routes;`.
- **Presenter pattern:** Optionally generate a presenter service for the MVP pattern.
- **Customizable:** Choose whether to include styles, routing, presenter, and module files.
- **Version-aware:** Automatically adapts to Angular versions where standalone is the default (Angular 17+).

---

## Development & Local Testing

To test your schematic locally before publishing to npm:

1. **Build the schematic:**
   ```sh
   npm run build
   ```

2. **Link the package globally:**
   ```sh
   npm link
   ```

3. **In your Angular project, link the schematic:**
   ```sh
   npm link mvp-schematic
   ```

4. **Run the generator as described above.**

To unlink after testing:
```sh
npm unlink mvp-schematic
```

---

## Publishing

- Ensure the `dist` folder and all necessary files are included (see the `files` field in `package.json`).
- Bump the version in `package.json` as needed.
- Run:
  ```sh
  npm publish
  ```

---

## Notes

- The schematic detects your Angular version and omits the `standalone: true` property if your project uses Angular 17+ (where standalone is the default).
- The interactive generator validates the component name to avoid spaces or special characters.
- All templates are separated into `classic` and `standalone` folders for maintainability.

---

## License

MIT

---

