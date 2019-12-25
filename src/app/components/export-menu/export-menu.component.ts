import { Component, NgZone, OnInit } from '@angular/core';
import { IpcRenderer } from 'electron';
import { NovelProviderService } from '../../services/novel-provider.service';
import { NovelToTextService } from '../../services/converter/novel-to-text.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { DatabaseService } from '../../services/database.service';

@Component({
	selector: 'app-export-menu',
	templateUrl: './export-menu.component.html',
	styleUrls: ['./export-menu.component.less'],
})
export class ExportMenuComponent implements OnInit {

	private readonly ipcRenderer: IpcRenderer;

	constructor(
		private novelProviderService: NovelProviderService,
		private novelToTextService: NovelToTextService,
		private router: Router,
		private route: ActivatedRoute,
		private notificationService: NotificationService,
		private ngZone: NgZone,
		private databaseService: DatabaseService,
	) {
		if ((window as any).require) {
			this.ipcRenderer = (window as any).require('electron').ipcRenderer;
		} else {
			this.notificationService.newNotificationEmitter.emit('electron hooks cannot be used because the IPC renderer is not loaded');
		}
	}

	public async ngOnInit() {
		if (this.novelProviderService.getNovel() === undefined) { await this.loadNovel(); }
	}

	public async onClickGoToWritingPanel() {
		await this.router.navigate(['/writing-board', this.novelProviderService.novelId]);
	}

	public onClickExportNovelAsJSON() {
		if (this.ipcRenderer === undefined) {
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

	public onClickExportNovelAsTXT() {
		if (this.ipcRenderer === undefined) {
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

	public onClickExportNovelAsPDF() {
		this.ipcRenderer.once('exportNovelAsPDFResponse', (event, arg) => {
			this.ngZone.run(() => {
				this.notificationService.newNotificationEmitter.emit('exported novel as PDF');
			});
		});
		this.ipcRenderer.send('exportNovelAsPDF', {
			novel: this.novelProviderService.getNovel(),
		});
	}

	private async loadNovel() {
		const novelId = this.route.snapshot.paramMap.get('novelId');
		// fetch novel from the database
		const dbNovelEntry = await this.databaseService.describeNovel(novelId);

		// set the novel as main novel to work with
		this.novelProviderService.setNovel(dbNovelEntry);
		this.novelProviderService.novelId = novelId;
	}
}
