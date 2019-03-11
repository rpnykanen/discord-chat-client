const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
    // Create the browser window.
    let win = new BrowserWindow({ width: 800, height: 600 })

    // and load the index.html of the app.
    win.loadFile('index.html')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    app.quit();
})