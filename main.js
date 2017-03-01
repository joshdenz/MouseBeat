/*
 *  MouseBeat
 *  Main Process Main Script 
 * 
 */ 
const {app, BrowserWindow, Menu, Tray, ipcMain} = require('electron');
const url = require('url');
const path = require('path');
let mainWindow, interval, tray;

//setup the url for the UI
let mainUrl = url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, '/app/main.html')
})

//this event fires after electron is intialized and the app is ready to create the browser window
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 363,
        height: 405,
        title: "MouseBeat",
        resizable: false,
        frame: false
    })

    mainWindow.loadURL(mainUrl);

    //this event fires when you minimize the window
    mainWindow.on('minimize', (event) => {
        event.preventDefault();
        mainWindow.hide();
    })

    //the below 3 functions set up the system tray menu and tooltip for the app
    tray = new Tray(path.join(__dirname, '/resources/star-512.png'));
    tray.setToolTip('MouseBeat');
    tray.setContextMenu(contextMenu);
})

//options object for the system tray menu
const contextMenu = Menu.buildFromTemplate([

    {
        label: 'Restore',
        click: () => {
            mainWindow.show();
        }
    },
    {
        label: 'Quit',
        click: () => {
            app.isQuiting = true;
            app.quit();

        }
    }
]);

//essentially the whole music playing mechanism is handled with message sending between the main process and the renderer process.
ipcMain.on('start', (event, arg) => {
    interval = setInterval(checkMousePosition, 75);
})
ipcMain.on('stop', (event, arg) => {
    stopLoop();
})

//sends message to renderer process to check mouse position
function checkMousePosition() {
    mainWindow.webContents.send('check-mouse-pos');
}

//stops the interval loop
function stopLoop() {
    clearInterval(interval);
}