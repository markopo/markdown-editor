const {BrowserWindow} = require("electron");


function saveFile() {
    const window = BrowserWindow.getFocusedWindow();
    window.webContents.send('editor-event',  {action: 'save', data: null });

}

module.exports = saveFile;
