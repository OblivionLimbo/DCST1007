/**
 * Starts the desktop application through the electron framework.
 * This file is not part of the curriculum, and does not need to be altered.
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Reload application on changes in src folder
const electronReload = require('./electron-reload')(path.join(__dirname, 'src'), {
  electron: path.join(__dirname, 'node_modules/.bin/electron'),
  ignored: /^.*\.(json|txt)$/,
});

let mainWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });

  // Open Development Tools
  mainWindow.openDevTools();

  mainWindow.loadFile('public/index.html');
});

app.on('window-all-closed', () => {
  app.quit();
});

// To prevent crash on exit in MacOS
app.on('will-quit', () => {
  electronReload.close();
});
