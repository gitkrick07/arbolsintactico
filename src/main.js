/*file aplacation main*/
const { BrowserWindow, Menu } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1500,
        height: 850,
        webPreferences: {
            nodeIntegration: true
        }

    })

    //Menu.setApplicationMenu(null);
    mainWindow.loadFile('src/ui/html/index.html');
}

module.exports = { createWindow };