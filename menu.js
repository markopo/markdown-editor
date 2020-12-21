const openFile = require("./openFile");
const saveFile = require("./saveFile");
const { app, Menu, shell, BrowserWindow } = require('electron');

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
    },
    {
        label: 'Debugging',
        submenu: [
            {
                role: 'toggleDevTools'
            }
        ]
    },
    { type: 'separator' },
    { role: 'reload', accelerator: 'Alt+R' },
    {
        label: 'Format',
        submenu: [
            {
                label: 'Toggle Bold',
                click() {
                    const window = BrowserWindow.getFocusedWindow();
                    window.webContents.send('editor-event', { action: 'toggle-bold', data: null});
                }
            },
            {
                label: 'Toggle Italic',
                click() {
                    const window = BrowserWindow.getFocusedWindow();
                    window.webContents.send('editor-event', { action: 'toggle-italic', data: null});
                }
            },
            {
                label: 'Toggle Strikethrough',
                click() {
                    const window = BrowserWindow.getFocusedWindow();
                    window.webContents.send('editor-event', { action: 'toggle-strikethrough', data: null});
                }
            }
        ]
    },
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                click() {
                    openFile();
                }
            },
            {
                label: 'Save',
                click() {
                    saveFile();
                }
            }
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
