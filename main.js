const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const processManager = require('./backend/processManager');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    console.log('dirname', __dirname);
    mainWindow = new BrowserWindow({width: 800, height: 600, frame: false, webPreferences: {
      nodeIntegration: true,
      menuBarVisible: true,
      preload: __dirname + '/preload.js'
    }});

    const startUrl = process.env.ELECTRON_START_URL || url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });
    mainWindow.loadURL(startUrl);
    //mainWindow.setMenu(null);

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

ipcMain.on('startProcess', async (event, args) => {
  console.log('Starting process', args);
  event.returnValue = processManager.start(args.workingDirectory, args.command);
});

ipcMain.on('stopProcess', async (event, args) => {
  const result = await processManager.stopProcessAtPort(args.port);
  event.reply('stopReply' + args.port, result);
})

ipcMain.on('checkPort', async (event, args) => {
  console.log('Checking port', args);
  result = await processManager.checkPort(args.port);
  event.reply('checkReply' + args.port, {result});
});

ipcMain.on('quit', () => {
  process.exit(0);
})

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
      app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
      createWindow()
  }
});