import { Component, OnInit } from '@angular/core';
import { IpcRenderer } from 'electron';
import { NovelProjectProviderService } from '../services/novel-project-provider.service';
import { NovelToTextService } from '../services/converter/novel-to-text.service';
import { Router } from '@angular/router';


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
		private novelToTextService: NovelToTextService,
		private router: Router,
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

	onClickGoToWritingPanel() {
		console.log("closing");
		this.router.navigate(['/writing-board']);
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

	onClickExportNovelAsTXT() {
		if (this.ipcRenderer == null) {
			console.warn('no ipcRenderer');
		} else {
			const text: string = NovelToTextService.convertNovelToText(this.novelProviderService.getNovel());
		
			this.ipcRenderer.once('showSaveDialogSyncResponse', (event, arg) => {
				console.log(arg ? 'saved novel' : 'didnt save novel');
			});
			this.ipcRenderer.send('showSaveDialogSync', {
				name: this.novelProviderService.getNovel().name,
				type: 'txt',
				fileContents: text,
			});
		}
	}

	onClickExportNovelAsPDF() {
		throw new Error('NOT_IMPLEMENTED');
	}
}
