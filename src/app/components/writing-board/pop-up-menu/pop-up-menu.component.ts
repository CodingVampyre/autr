import { Component, OnInit, Input, Output } from '@angular/core';
import { NovelProviderService } from 'src/app/services/novel-provider.service';
import { EventEmitter } from '@angular/core';
import { ChapterSwitcherService } from 'src/app/services/chapter-switcher.service';

@Component({
	selector: 'app-pop-up-menu',
	templateUrl: './pop-up-menu.component.html',
	styleUrls: ['./pop-up-menu.component.less']
})
export class PopUpMenuComponent implements OnInit {

	@Input() chapterNr: number;
	@Input() sceneNr: number;
	@Input() context: 'chapter' | 'scene';

	@Output() destroyEmitter: EventEmitter<void> = new EventEmitter();

	constructor(
		private novelProvider: NovelProviderService,
		private chapterSwitcher: ChapterSwitcherService,
	) { }

	renameChapter(chapterNewName: string) {
		this.novelProvider.renameChapter(this.chapterNr, chapterNewName);
	}

	renameScene(sceneNewName: string) {
		this.novelProvider.renameScene(this.chapterNr, this.sceneNr, sceneNewName);
	}

	ngOnInit() {
	}

	onClickDeleteChapter(chapterNr: number) {
		this.novelProvider.deleteChapter(chapterNr);

		if (this.novelProvider.getNovel().chapters.length <= 0) {
			this.novelProvider.addChapter(0);
			this.chapterSwitcher.switchToChapterEmitter.emit({toChapter: 0, toScene: 0});
		} else if (this.novelProvider.getNovel().chapters[chapterNr - 1] != null && this.novelProvider.getNovel().chapters[chapterNr - 1].scenes.length > 0) {
			this.chapterSwitcher.switchToChapterEmitter.emit({toChapter: chapterNr - 1, toScene: 0});
		} else if (this.novelProvider.getNovel().chapters[0].scenes.length > 0) {
			this.chapterSwitcher.switchToChapterEmitter.emit({toChapter: 0, toScene: 0});
		} else {
			this.novelProvider.addScene(0, 0);
			this.chapterSwitcher.switchToChapterEmitter.emit({toChapter: 0, toScene: 0});
		}

		return this.destroyMe();
	}

	onClickDeleteScene(chapterNr: number, sceneNr: number) {
		this.novelProvider.deleteScene(chapterNr, sceneNr);

		// switch to other scene
		if (this.novelProvider.getNovel().chapters[chapterNr].scenes[sceneNr - 1] != null) {
			this.chapterSwitcher.switchToChapterEmitter.emit({toChapter: chapterNr, toScene: sceneNr - 1});
		} else if (this.novelProvider.getNovel().chapters[chapterNr - 1] != null && this.novelProvider.getNovel().chapters[chapterNr - 1].scenes.length > 0) {
			this.chapterSwitcher.switchToChapterEmitter.emit({toChapter: chapterNr - 1, toScene: 0});
		} else {
			this.novelProvider.addScene(0, 0);
			this.chapterSwitcher.switchToChapterEmitter.emit({toChapter: 0, toScene: 0});
		}

		this.destroyMe();
	}

	destroyMe() {
		this.destroyEmitter.emit();
	}

}
