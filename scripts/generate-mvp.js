const inquirer = require('inquirer').default;
const { exec } = require('child_process');

(async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Component name (no spaces or special characters):',
            validate: (input) =>
                /^[a-zA-Z0-9\-_]+$/.test(input) || 'Name must not contain spaces or special characters.'
        },
        {
            name: 'directory',
            message: 'Target path for the component:',
            default: 'src/app/features'
        },
        {
            type: 'confirm',
            name: 'standalone',
            message: 'Use Angular standalone style?',
            default: false
        },
        {
            type: 'confirm',
            name: 'withPresenter',
            message: 'Include presenter.ts file?',
            default: true
        },
        {
            type: 'confirm',
            name: 'withModule',
            message: 'Include module.ts file?',
            default: true,
            when: (answers) => !answers.standalone
        },
        {
            type: 'confirm',
            name: 'withRouting',
            message: 'Include routing.ts file?',
            default: true
        },
        {
            type: 'confirm',
            name: 'withStyles',
            message: 'Include .scss file?',
            default: true
        }
    ]);

    const cmd =
        `ng generate mvp-schematic:mvp ` +
        `--name=${answers.name} ` +
        `--standalone=${answers.standalone} ` +
        `--with-presenter=${answers.withPresenter} ` +
        `--with-module=${answers.withModule !== undefined ? answers.withModule : false} ` +
        `--with-routing=${answers.withRouting} ` +
        `--with-styles=${answers.withStyles} ` +
        `--target-path='${answers.directory}'`;

    console.log('\n🔧 Running command:\n', cmd, '\n');

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Error: ${stderr}`);
            process.exit(1);
        }
        console.log(stdout);
    });
})();
