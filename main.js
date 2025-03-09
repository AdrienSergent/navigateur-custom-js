const { app, BrowserWindow } = require('electron');
const path = require('path');

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'src/ui/preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Charger correctement ton fichier index.html
  mainWindow.loadFile(path.join(__dirname, 'src/ui/index.html'));

  mainWindow.webContents.openDevTools(); // Optionnel pour le debug
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
