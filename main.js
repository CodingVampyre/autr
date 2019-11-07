const { app, BrowserWindow, ipcMain, dialog } = require('electron');

const url = require("url");
const path = require("path");

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 600,
		minHeight: 600,
		minWidth: 1200,
		webPreferences: {
			nodeIntegration: true,
		},
		titleBarStyle: 'hidden',
	})

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, `/dist/index.html`),
			protocol: "file:",
			slashes: true,
		})
	);
	// Open the DevTools.
	mainWindow.webContents.openDevTools();
	mainWindow.setMenuBarVisibility(false);

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
	if (mainWindow === null) createWindow();
});

// show the dialog to get a path
ipcMain.on('showSaveDialogSync', (event, arg) => {
	const path = dialog.showSaveDialogSync({
		title: "Export JSON to...",
		properties: ['openDirectory'],
	});

	console.log('choosed path', path);

	mainWindow.webContents.send('showSaveDialogSyncResponse', path);
});