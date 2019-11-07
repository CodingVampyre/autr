import { Component, OnInit } from '@angular/core';
import { IpcRenderer } from 'electron';


@Component({
	selector: 'app-export-menu',
	templateUrl: './export-menu.component.html',
	styleUrls: ['./export-menu.component.less']
})
export class ExportMenuComponent implements OnInit {

	// TODO to service
	private ipcRenderer: IpcRenderer;

	constructor() { 
		// TODO make a service
		if((<any>window).require) {
			this.ipcRenderer = (<any>window).require('electron').ipcRenderer;
		} else {
			console.warn('ipcRenderer could not load');
		}
	}

	ngOnInit() {
	}

	onClickExportNovelAsJSON() {
		this.ipcRenderer.once('showSaveDialogSyncResponse', (event, arg) => {
			console.log('path = ', arg);
		});
		this.ipcRenderer.send('showSaveDialogSync');
	}

}
