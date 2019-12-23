import { Component, OnInit, HostListener } from '@angular/core';
import { NovelProviderService } from 'src/app/services/novel-provider.service';
import { ChapterSwitcherService } from 'src/app/services/chapter-switcher.service';
import { DatabaseService } from 'src/app/services/database.service';
import { NovelTextChangeService } from 'src/app/services/novel-text-change.service';

@Component({
  selector: 'app-writing-panel',
  templateUrl: './writing-panel.component.html',
  styleUrls: ['./writing-panel.component.less'],
})
export class WritingPanelComponent implements OnInit {

	/** text currently controlled by the writing board */
	public currentSceneText: string;

	/** determines when the novel is automatically saved when no key is pressed */
	private autosaveTimer: NodeJS.Timer;

	constructor(
		private novelService: NovelProviderService,
		private chapterSwitcher: ChapterSwitcherService,
		private database: DatabaseService,
		private novelTextChangeService: NovelTextChangeService,
	) { }

	/** controls manual save via key combination */
	@HostListener('document:keydown.control.s', ['$event'])
	public async onKeyDown(event) {
		event.preventDefault();
		await this.saveNovel();
	}

	public ngOnInit() {
		if (this.novelService.getNovel() !== undefined) {
			// load text from novel Provider to current Writing panel
			this.currentSceneText = this.novelService.getNovel()
				.chapters[this.chapterSwitcher.currentChapter]
				.scenes[this.chapterSwitcher.currentScene]
				.text;
			// executed before moving
			this.chapterSwitcher.saveTextEmitter.subscribe((newData) => {
				// store old text in matching chapter
				this.novelService.getNovel()
					.chapters[newData.chapter]
					.scenes[newData.scene]
					.text = this.currentSceneText;
			});
			// load new text whenever a scene is switched, executed after moving
			this.chapterSwitcher.switchToChapterEmitter.subscribe((event) => {
				// set text to new text
				this.currentSceneText = this.novelService.getNovel()
					.chapters[event.toChapter]
					.scenes[event.toScene]
					.text;
			});
		}
	}

	/** fired everytime the text is changed */
	public onChange() {
		const autoSaveIntervalMs = 1000;
		this.novelTextChangeService.emit(this.currentSceneText);

		// reset autosave timer and restart it again!
		clearTimeout(this.autosaveTimer);
		this.autosaveTimer = setTimeout(async () => this.saveNovel(), autoSaveIntervalMs);

	}

	/** saves a novel */
	private async saveNovel() {
		// fetch novel id
		const novelId: string = this.novelService.novelId;
		if (novelId === undefined) { throw new Error('currently, no novel is loaded'); }

		// save text to json
		this.chapterSwitcher.saveTextEmitter.emit({
			chapter: this.chapterSwitcher.currentChapter,
			scene: this.chapterSwitcher.currentScene,
		});

		// save it into the database
		await this.database.updateNovel(novelId, this.novelService.getNovel());
	}
}
