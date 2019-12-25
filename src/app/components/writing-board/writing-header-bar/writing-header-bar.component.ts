import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';
import { NovelProviderService } from '../../../services/novel-provider.service';
import { ChapterSwitcherService } from '../../../services/chapter-switcher.service';
import { DatabaseService } from '../../../services/database.service';

@Component({
  selector: 'app-writing-header-bar',
  templateUrl: './writing-header-bar.component.html',
  styleUrls: ['./writing-header-bar.component.less'],
})
export class WritingHeaderBarComponent {

	constructor(
		private readonly notificationService: NotificationService,
		private router: Router,
		private novelService: NovelProviderService,
		private chapterSwitcherService: ChapterSwitcherService,
		private databaseService: DatabaseService,
	) { }

	/** fired when the novel save button is pressed */
	public async onClickSaveNovel(event) {
		await this.saveNovel();
		this.notificationService.newNotificationEmitter.emit('novel was saved');
	}

	/** goes to the export menu */
	public async onClickOpenExportMenu(event) {
		await this.router.navigate(['export', this.novelService.novelId]);
	}

	public async onClickReturnToMainMenu($event: MouseEvent) {
		await this.saveNovel();
		await this.router.navigate(['projects']);
	}

	/** saves a novel */
	private async saveNovel() {
		// fetch novel id
		const novelId: string = this.novelService.novelId;
		if (novelId === undefined) { throw new Error('currently, no novel is loaded'); }

		// save text to json
		this.chapterSwitcherService.saveTextEmitter.emit({
			chapter: this.chapterSwitcherService.currentChapter,
			scene: this.chapterSwitcherService.currentScene,
		});

		// save it into the database
		await this.databaseService.updateNovel(novelId, this.novelService.getNovel());
	}

}
