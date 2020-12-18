const { app, Menu, shell } = require('electron');

const template = [
    {
        role: 'help',
        submenu: [
            {
                label: 'About Editor',
                click() {
                    shell.openExternal('https://simplemde.com')
                }
            },
            {
                label: 'Beep!',
                click() {
                    shell.beep();
                }
            },
        ]
    }
];

if(process.platform === 'darwin') {

    template.unshift({
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    });
}

if(process.env.DEBUG) {
    template.push( {
        label: 'Debugging',
        submenu: [
            {
                role: 'toggleDevTools'
            }
        ]
    });
}

const menu = Menu.buildFromTemplate(template);

module.exports = menu;
