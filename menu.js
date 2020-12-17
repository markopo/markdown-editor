const { Menu, shell } = require('electron');

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
            {
                label: 'Debugging',
                submenu: [
                    {
                        role: 'toggleDevTools'
                    }
                ]
            }
        ]
    }
];

const menu = Menu.buildFromTemplate(template);

module.exports = menu;