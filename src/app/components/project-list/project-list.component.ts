/**
 * this code is licensed under the MIT-License
 * <https://opensource.org/licenses/MIT>
 * AUTR - 2019
 *
 * Created by CodingVampyre <tobiaskavse@hotmail.de>
 */

import { Component, NgZone, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { NovelProviderService } from '../../services/novel-provider.service';
import { Router } from '@angular/router';
import { IpcRenderer } from 'electron';
import { NotificationService } from '../../services/notification.service';
import { Novel } from '../../data-models/novel.interface';
import { ChapterSwitcherService } from '../../services/chapter-switcher.service';

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.less'],
})
export class ProjectListComponent implements OnInit {

	public novels: any[] = [];

	private readonly ipcRenderer: IpcRenderer;

	constructor(
		private readonly db: DatabaseService,
		private chapterSwitcherService: ChapterSwitcherService,
		private readonly novelProvider: NovelProviderService,
		private router: Router,
		private notificationService: NotificationService,
		private ngZone: NgZone,
	) {
		if ((window as any).require) {
			this.ipcRenderer = (window as any).require('electron').ipcRenderer;
		} else {
			this.notificationService.newNotificationEmitter.emit('IPC renderer did not load. Stuff like export is not available.');
		}
	}

	/** creates an index if it does not eexist and lists the novels */
	public async ngOnInit() {
		// create index if it doesn't exist
		await this.db.createNovelIndex();

		// fetch novels
		this.novels = await this.db.listNovels();
	}

	/**
	 * loads a novel and navigates to the next entry in project list
	 * @param event event metadata
	 * @param novelId primary key of the novel that should be loaded
	 */
	public async onClickLoadNovel(event, novelId: string) {
		await this.router.navigate(['/writing-board', novelId]);
	}

	/**
	 * creates a novel and stores it in the database
	 * @param newNovelName names a novel
	 */
	public async onClickCreateNewNovel(newNovelName: string): Promise<void> {
		// store a new novel
		await this.db.storeNovel({
			name: newNovelName,
			chapters: [{
				name: 'chapter 1',
				areScenesVisible: true,
				scenes: [{
					name: 'first scene',
					text: 'write your scene here!',
				}],
			}],
			cursor: {
				currentChapter: 0,
				currentScene: 0,
			},
		});

		// refresh list
		this.novels = await this.db.listNovels();
	}

	/**
	 * deletes a novel and reloads the list
	 * @param event the event itself
	 * @param novelId the novelId that should be deleted
	 */
	public async onClickDeleteNovel(event, novelId): Promise<void> {
		await this.db.deleteNovel(novelId);
		this.novels = await this.db.listNovels();
	}

	/** takes a novel from the file system and converts it to internal data */
	public onClickImportNovel() {
		this.ipcRenderer.once('showNovelImportDialogResponse', async (event, arg) => {
			if (arg !== undefined) {
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
