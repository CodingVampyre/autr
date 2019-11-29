/**
 * this code is licensed under the MIT-License
 * <https://opensource.org/licenses/MIT>
 * AUTR - 2019
 *
 * Created by CodingVampyre <tobiaskavse@hotmail.de>
 */

import {Component, NgZone, OnInit} from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { NovelProjectProviderService } from '../../services/novel-project-provider.service';
import { Router } from '@angular/router';
import { IpcRenderer } from 'electron';
import { NotificationService } from '../../services/notification.service';
import {Novel} from '../../data-models/novel.interface';

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.less']
})
export class ProjectListComponent implements OnInit {

	private readonly ipcRenderer: IpcRenderer;

	constructor(
		private readonly db: DatabaseService,
		private readonly novelProvider: NovelProjectProviderService,
		private router: Router,
		private notificationService: NotificationService,
		private ngZone: NgZone,
	) {
		if ((window as any).require) {
			this.ipcRenderer = (window as any).require('electron').ipcRenderer;
		} else {
			console.warn('ipcRenderer could not load');
		}
	}

	novels: any[] = [];

	async ngOnInit() {
		// create index if it doesn't exist
		await this.db.createNovelIndex();

		// fetch novels
		this.novels = await this.db.listNovels();
	}

	/**
	 * loads a novel into the database and redirects to the writing board
	 */
	async onClickLoadNovel(event, novelId: string) {
		const dbNovelEntry = await this.db.describeNovel(novelId);
		this.novelProvider.setNovel(dbNovelEntry);
		this.novelProvider.novelId = novelId;
		await this.router.navigate(['/writing-board']);
	}

	async onClickCreateNewNovel(newNovelName: string) {
		// store a new novel
		await this.db.storeNovel({
			name: newNovelName,
			chapters: [{
				name: 'chapter 1',
				scenes: [{
					name: 'first scene',
					text: 'write your scene here!'
				}],
			}],
		});

		// refresh list
		this.novels = await this.db.listNovels();
	}

	async onClickDeleteNovel(event, novelId) {
		await this.db.deleteNovel(novelId);
		this.novels = await this.db.listNovels();
	}

	onClickImportNovel() {
		this.ipcRenderer.once('showNovelImportDialogResponse', async (event, arg) => {
			if (arg != null) {
				const importedNovel: Novel = JSON.parse(arg);
				await this.db.storeNovel(importedNovel);
			}

			await this.ngZone.run(async () => {
				this.notificationService.newNotificationEmitter.emit('imported novel');
				this.novels = await this.db.listNovels();
			});
		});
		this.ipcRenderer.send('showNovelImportDialog');
	}
}
