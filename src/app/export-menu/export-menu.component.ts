import { Component, OnInit } from '@angular/core';
import { IpcRenderer } from 'electron';
import { NovelProjectProviderService } from '../services/novel-project-provider.service';


@Component({
	selector: 'app-export-menu',
	templateUrl: './export-menu.component.html',
	styleUrls: ['./export-menu.component.less']
})
export class ExportMenuComponent implements OnInit {

	// TODO to service
	private ipcRenderer: IpcRenderer;

	constructor(
		private novelProviderService: NovelProjectProviderService,
	) { 
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
			console.log(arg ? 'saved novel' : 'did not save novel');
		});
		this.ipcRenderer.send('showSaveDialogSync', {
			name: this.novelProviderService.getNovel().name,
			type: 'json',
			fileContents: JSON.stringify(this.novelProviderService.getNovel()),
		});
	}

}
