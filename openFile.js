const fs = require("fs");
const { dialog } = require('electron');
const {BrowserWindow} = require("electron");


function openFile() {
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
}

module.exports = openFile;

