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
import {Chapter, Novel} from '../../data-models/novel.interface';
import {ChapterSwitcherService} from '../../services/chapter-switcher.service';

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.less']
})
export class ProjectListComponent implements OnInit {

	private readonly ipcRenderer: IpcRenderer;

	constructor(
		private readonly db: DatabaseService,
		private chapterSwitcherService: ChapterSwitcherService,
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
	 * loads a novel and navigates to the next entry in project list
	 * @param event event metadata
	 * @param novelId primary key of the novel that should be loaded
	 */
	async onClickLoadNovel(event, novelId: string) {
		// fetch novel from the database
		const dbNovelEntry = await this.db.describeNovel(novelId);

		// set the novel as main novel to work with
		this.novelProvider.setNovel(dbNovelEntry);
		this.novelProvider.novelId = novelId;

		// set chapter and scene
		this.chapterSwitcherService.switchToChapterEmitter.emit({
			toChapter: this.novelProvider.getNovel().cursor.currentChapter,
			toScene: this.novelProvider.getNovel().cursor.currentScene,
		});

		// navigate
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
			cursor: {
				currentChapter: 0,
				currentScene: 0,
			}
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
