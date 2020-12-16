const { app, BrowserWindow, Menu } = require('electron');
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

});

Menu.setApplicationMenu(menu);