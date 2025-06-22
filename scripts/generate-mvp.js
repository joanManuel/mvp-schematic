const inquirer = require('inquirer').default;
const { exec } = require('child_process');

(async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Nombre del componente:',
            validate: (input) => !!input || 'Debe ingresar un nombre.'
        },
        {
            name: 'directory',
            message: '¿En qué ruta deseas crearlo?',
            default: 'src/app/features'
        },
        {
            type: 'confirm',
            name: 'withPresenter',
            message: '¿Incluir archivo presenter.ts?',
            default: true
        },
        {
            type: 'confirm',
            name: 'withModule',
            message: '¿Incluir archivo module.ts?',
            default: true
        },
        {
            type: 'confirm',
            name: 'withRouting',
            message: '¿Incluir archivo routing.ts?',
            default: true
        },
        {
            type: 'confirm',
            name: 'withStyles',
            message: '¿Incluir archivo .scss?',
            default: true
        }
    ]);

    const cmd =
        `ng generate mvp-schematic:mvp ` +
        `--name=${answers.name} ` +
        `--with-presenter=${answers.withPresenter} ` +
        `--with-module=${answers.withModule} ` +
        `--with-routing=${answers.withRouting} ` +
        `--with-styles=${answers.withStyles} ` +
        `--target-path='${answers.directory}'`;

    console.log('\n🔧 Ejecutando comando:\n', cmd, '\n');

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Error: ${stderr}`);
            process.exit(1);
        }
        console.log(stdout);
    });
})();
