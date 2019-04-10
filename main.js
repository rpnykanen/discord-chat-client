const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600 })

    const index = url.format({
        protocol: 'http:',
        host: 'localhost:8080',
        pathname: 'index.html',
        slashes: true
      })

    // and load the index.html of the app.
    // win.loadFile('index.html')
    win.loadURL(index)

    win.show()

    win.webContents.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    app.quit();
})