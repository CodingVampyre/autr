import {Component, NgZone, OnInit} from '@angular/core';
import { IpcRenderer } from 'electron';
import { NovelProjectProviderService } from '../../services/novel-project-provider.service';
import { NovelToTextService } from '../../services/converter/novel-to-text.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import {PdfRendererService} from '../../services/converter/pdf-renderer.service';


@Component({
	selector: 'app-export-menu',
	templateUrl: './export-menu.component.html',
	styleUrls: ['./export-menu.component.less']
})
export class ExportMenuComponent implements OnInit {

	// TODO to service
	private readonly ipcRenderer: IpcRenderer;

	constructor(
		private novelProviderService: NovelProjectProviderService,
		private novelToTextService: NovelToTextService,
		private router: Router,
		private notificationService: NotificationService,
		private ngZone: NgZone,
	) {
		if ((window as any).require) {
			this.ipcRenderer = (window as any).require('electron').ipcRenderer;
		} else {
			this.notificationService.newNotificationEmitter.emit('electron hooks cannot be used because the IPC renderer is not loaded');
		}
	}

	ngOnInit() {
	}

	async onClickGoToWritingPanel() {
		await this.router.navigate(['/writing-board']);
	}

	onClickExportNovelAsJSON() {
		if (this.ipcRenderer == null) {
			this.notificationService.newNotificationEmitter.emit('Electron features currently unavailable. Did you open this app using ng serve?');
		} else {
			this.ipcRenderer.once('showSaveDialogSyncResponse', (event, arg) => {
				if (arg) {
					this.ngZone.run(() => {
						this.notificationService.newNotificationEmitter.emit('exported novel as JSON');
					});
				}
			});
			this.ipcRenderer.send('showSaveDialogSync', {
				name: this.novelProviderService.getNovel().name,
				type: 'json',
				fileContents: JSON.stringify(this.novelProviderService.getNovel()),
			});
		}
	}

	onClickExportNovelAsTXT() {
		if (this.ipcRenderer == null) {
			this.notificationService.newNotificationEmitter.emit('Electron features currently unavailable. Did you open this app using ng serve?');
		} else {
			const text: string = NovelToTextService.convertNovelToText(this.novelProviderService.getNovel());

			this.ipcRenderer.once('showSaveDialogSyncResponse', (event, arg) => {
				this.ngZone.run(() => {
					this.notificationService.newNotificationEmitter.emit('exported novel as TXT');
				});
			});
			this.ipcRenderer.send('showSaveDialogSync', {
				name: this.novelProviderService.getNovel().name,
				type: 'txt',
				fileContents: text,
			});
		}
	}

	async onClickExportNovelAsPDF() {
		this.ipcRenderer.once('exportNovelAsPDFResponse', (event, arg) => {
			this.ngZone.run(() => {
				this.notificationService.newNotificationEmitter.emit('exported novel as PDF');
			});
		});
		this.ipcRenderer.send('exportNovelAsPDF', {
			novel: this.novelProviderService.getNovel(),
		});
	}
}
