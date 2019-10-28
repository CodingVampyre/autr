import { Component, OnInit } from '@angular/core';
import { NovelProjectProviderService } from 'src/app/services/novel-project-provider.service';
import { ChapterSwitcherService } from 'src/app/services/chapter-switcher.service';
import { DatabaseService } from 'src/app/services/database.service';

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
	) { }

	currentSceneText: string;

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

	onChange() { /** gets called whenever text changes */ }

	async onClickSaveNovel() {
		// fetch novel id
		const novelid: string = this.novelService.novelId;
		if (novelid == null) throw new Error('currently, no novel is loaded');

		// save text to json
		this.chapterSwitcher.saveTextEmitter.emit({
			chapter: this.chapterSwitcher.currentChapter,
			scene: this.chapterSwitcher.currentScene,
		});

		// save it into the database
		await this.database.updateNovel(novelid, this.novelService.getNovel());
		console.log('novel saved');
	}
}
