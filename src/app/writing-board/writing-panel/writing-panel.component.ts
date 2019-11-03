import { Component, OnInit, HostListener } from '@angular/core';
import { NovelProjectProviderService } from 'src/app/services/novel-project-provider.service';
import { ChapterSwitcherService } from 'src/app/services/chapter-switcher.service';
import { DatabaseService } from 'src/app/services/database.service';
import { NovelTextChangeService } from 'src/app/services/novel-text-change.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-writing-panel',
  templateUrl: './writing-panel.component.html',
  styleUrls: ['./writing-panel.component.less']
})
export class WritingPanelComponent implements OnInit {

	constructor(
		private novelService: NovelProjectProviderService,
		private chapterSwitcher: ChapterSwitcherService,
		private database: DatabaseService,
		private novelTextChangeService: NovelTextChangeService,
		private router: Router,
	) { }

	/** text currently controlled by the writing board*/
	currentSceneText: string;

	/** determines when the novel is automatically saved when no key is pressed */
	private autosaveTimer: NodeJS.Timer;

	/** controlls manual save via key combination */
	@HostListener('document:keydown.control.s', ['$event'])
    async onKeyDown(event) {
        event.preventDefault();
        await this.saveNovel();
	}

	ngOnInit() {
		if (this.novelService.getNovel() != null) {
			// load text from novel Provider to current Writing panel
			this.currentSceneText = this.novelService.getNovel().chapters[this.chapterSwitcher.currentChapter].scenes[this.chapterSwitcher.currentScene].text;
			// executed before moving
			this.chapterSwitcher.saveTextEmitter.subscribe((newData) => {
				// store old text in matching chapter
				this.novelService.getNovel().chapters[newData.chapter].scenes[newData.scene].text = this.currentSceneText;
			});
			// load new text whenever a scene is switched, executed after moving
			this.chapterSwitcher.switchToChapterEmitter.subscribe((event) => {
				// set text to new text
				this.currentSceneText = this.novelService.getNovel().chapters[event.toChapter].scenes[event.toScene].text;
			});
		}
	}

	/** fired everytime the text is changed */
	onChange() {
		this.novelTextChangeService.emit(this.currentSceneText);

		// reset autosave timer and restart it again!
		clearTimeout(this.autosaveTimer);
		this.autosaveTimer = setTimeout(async () => await this.saveNovel(), 1000);

	}

	/** fired when the novel save button is pressed */
	async onClickSaveNovel(event) {
		await this.saveNovel();

		// paint button green for one second
		if (!event.target.className.includes('button-confirm')) {
			event.target.classList.add('button-confirm');
			setTimeout(() => event.target.classList.remove('button-confirm'), 2000);
		}
	}

	/** goes to the export menu */
	onClickOpenExportMenu(event) {
		console.log("opening export menu!");
		this.router.navigate(['export']);
	}
	
	/** saves a novel */
	private async saveNovel() {
		// fetch novel id
		const novelId: string = this.novelService.novelId;
		if (novelId == null) { throw new Error('currently, no novel is loaded'); }

		// save text to json
		this.chapterSwitcher.saveTextEmitter.emit({
			chapter: this.chapterSwitcher.currentChapter,
			scene: this.chapterSwitcher.currentScene,
		});

		// save it into the database
		await this.database.updateNovel(novelId, this.novelService.getNovel());
	}
}
