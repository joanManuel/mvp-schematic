const fs = require("fs");
const path = require("path");

function getProjectRoot() {
    // El directorio donde se instala el paquete
    return path.resolve(process.cwd());
}

function copyScript() {
    const destScriptsDir = path.join(getProjectRoot(), "scripts");
    const destScript = path.join(destScriptsDir, "generate-mvp.js");
    const srcScript = path.join(__dirname, "generate-mvp.js");

    if (!fs.existsSync(destScriptsDir)) {
        fs.mkdirSync(destScriptsDir, { recursive: true });
    }
    fs.copyFileSync(srcScript, destScript);
    console.log("✅ generate-mvp.js copiado a scripts/");
}

function updatePackageJson() {
    const pkgPath = path.join(getProjectRoot(), "package.json");
    if (!fs.existsSync(pkgPath)) return;

    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    pkg.scripts = pkg.scripts || {};
    pkg.scripts["generate:mvp"] = "node scripts/generate-mvp.js";
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    console.log('✅ Script "generate:mvp" agregado a package.json');
}

try {
    copyScript();
    updatePackageJson();
} catch (e) {
    console.error("❌ Error en postinstall:", e);
}
