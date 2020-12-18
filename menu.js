const { app, Menu, shell, BrowserWindow, ipcMain } = require('electron');

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
        label: 'Format',
        submenu: [
            {
                label: 'Toggle Bold',
                click() {
                    const window = BrowserWindow.getFocusedWindow();
                    window.webContents.send('editor-event', 'toggle-bold');
                }
            },
            {
                label: 'Toggle Italic',
                click() {
                    const window = BrowserWindow.getFocusedWindow();
                    window.webContents.send('editor-event', 'toggle-italic');
                }
            },
            {
                label: 'Toggle Strikethrough',
                click() {
                    const window = BrowserWindow.getFocusedWindow();
                    window.webContents.send('editor-event', 'toggle-strikethrough');
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

// events
ipcMain.on('save', (event, args) => {
    console.log('saving contents of the file!', args);

});


module.exports = menu;
