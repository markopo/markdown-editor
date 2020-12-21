const { app,
        globalShortcut,
        BrowserWindow,
        Menu,
        ipcMain,
        dialog } = require('electron');
const fs = require('fs');
const menu = require('./menu');
const saveFile = require("./saveFile");
const openFile = require("./openFile");

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
            saveFile();
    });

    globalShortcut.register('CommandOrControl+O', () => {
            openFile();
    });

    // events
    ipcMain.on('save', (event, args) => {
        console.log('saving contents of the file!', args);

        const window = BrowserWindow.getFocusedWindow();
        const options = {
            title: 'Save markdown file',
            filters: [
                {
                    name: 'MyFile',
                    extensions: ['md']
                }
            ]
        };

        dialog.showSaveDialog(window, options)
            .then(result => {
                const { canceled, filePath } = result;
                console.log('save return: ', result);

                if(canceled) return;

                if(filePath) {
                    fs.writeFileSync(filePath, args);
                }
            });

    });

    ipcMain.on('editor-reply', (event, args) => {
            console.log('Reply: ', args);


    });

});

Menu.setApplicationMenu(menu);
