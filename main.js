const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { writeFileSync, readFileSync, createWriteStream } = require('fs');

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
		icon: path.join(__dirname, 'assets/icons/logo/64x64.png'),
		// titleBarStyle: 'hidden',
	});

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

// ****
// * SAVING NOVELS
// ****

// show the dialog to get a path
ipcMain.on('showSaveDialogSync', (event, arg) => {

	const filename = arg.name.toLowerCase() + '-' + Date.now() + '.' + arg.type;

	// dialog
	const path = dialog.showSaveDialogSync({
		title: 'Export Novel to...',
		defaultPath: filename,
		buttonLabel: 'export novel'
	});

	// if dialog was interrupted, abort saving
	if (path == null) {
		return mainWindow.webContents.send('showSaveDialogSyncResponse', false);
	}

	// save novel as json
	writeFileSync(path, arg.fileContents);

	// send reply to render process
	return mainWindow.webContents.send('showSaveDialogSyncResponse', true);
});

ipcMain.on('showNovelImportDialog', (event, arg) => {
	const path = dialog.showOpenDialogSync({
		title: 'import a novel',
		filters: [{name: 'only json', extensions: ['json']}],
		properties: ['openFile']
	});

	if (path == null) {
		return mainWindow.webContents.send('showNovelImportDialogResponse', null);
	}

	const contents = readFileSync(path[0]).toString();
	return mainWindow.webContents.send('showNovelImportDialogResponse', contents);
});

const pdfkit = require('pdfkit');

ipcMain.on('exportNovelAsPDF', (event, arg) => {
	const path = dialog.showSaveDialogSync({
		title: 'Export Novel to...',
		defaultPath: 'novel.pdf',
		buttonLabel: 'export novel'
	});
	const doc = new pdfkit;
	const novel = arg.novel;
	// start writing
	doc.pipe(createWriteStream(path));

	// create norm pages
	doc.font('Courier');
	doc.moveDown(8);
	doc.fontSize(30).text(arg.novel.name, { align: 'center' });
	doc.fontSize(24).text('by ' + 'Place Holder');
	doc.addPage({ margin: 85 });
	for (const chapter of arg.novel.chapters) {
		doc.fontSize(26).text(chapter.name).moveDown(0.5);
		for (const scene of chapter.scenes) {
			doc.fontSize(20).text(scene.name).moveDown(0.2);
			doc.fontSize(12).text(scene.text,{ align: 'justify', lineGap: 6 }).moveDown(1);
		}
	}

	// send
	doc.end();
	return mainWindow.webContents.send('exportNovelAsPDFResponse');
});
