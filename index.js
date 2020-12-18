const { app, globalShortcut, BrowserWindow, Menu } = require('electron');
const menu = require('./menu');

let window;

app.on('ready', () => {

    window = new BrowserWindow({
        width: 1366,
        height: 768,
        webPreferences: {
            nodeIntegration: true
        }
    });

    window.loadFile('index.html');

    globalShortcut.register('CommandOrControl+S', () => {
            console.log('Saving the file!');

            const window = BrowserWindow.getFocusedWindow();
            window.webContents.send('editor-event', 'save');
    });

});

Menu.setApplicationMenu(menu);
