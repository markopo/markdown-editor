const { app,
        globalShortcut,
        BrowserWindow,
        Menu,
        ipcMain,
        dialog } = require('electron');
const fs = require('fs');
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
            const window = BrowserWindow.getFocusedWindow();
            window.webContents.send('editor-event',  {action: 'save', data: null });
    });

    globalShortcut.register('CommandOrControl+O', () => {
           const window = BrowserWindow.getFocusedWindow();

           const options = {
               title: 'Pick a markdown file',
               filters: [
                   { name: 'Markdown files', extensions: ['md'] },
                   { name: 'Text files', extensions: ['txt']}
               ]
           };

           dialog.showOpenDialog(window, options)
               .then(result => {
                   const { canceled, filePaths } = result;

                   if(canceled || !filePaths) return;

                   const content = fs.readFileSync(filePaths[0]).toString();
                   window.webContents.send('editor-event',  {action: 'open-file', data: content });
               });

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
