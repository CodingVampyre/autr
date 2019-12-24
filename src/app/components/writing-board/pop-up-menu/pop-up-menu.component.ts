import { Component, OnInit, Input, Output } from '@angular/core';
import { NovelProviderService } from '../../../services/novel-provider.service';
import { EventEmitter } from '@angular/core';
import { ChapterSwitcherService } from '../../../services/chapter-switcher.service';

@Component({
	selector: 'app-pop-up-menu',
	templateUrl: './pop-up-menu.component.html',
	styleUrls: ['./pop-up-menu.component.less'],
})
export class PopUpMenuComponent {

	@Input() public chapterNr: number;
	@Input() public sceneNr: number;
	@Input() public context: 'chapter' | 'scene';

	@Output() public destroyEmitter: EventEmitter<void> = new EventEmitter();

	constructor(
		private novelProvider: NovelProviderService,
		private chapterSwitcher: ChapterSwitcherService,
	) { }

	public renameChapter(chapterNewName: string) {
		this.novelProvider.renameChapter(this.chapterNr, chapterNewName);
	}

	public renameScene(sceneNewName: string) {
		this.novelProvider.renameScene(this.chapterNr, this.sceneNr, sceneNewName);
	}

	public onClickDeleteChapter(chapterNr: number) {
		const hasNovelNoMoreChapters = this.novelProvider.getNovel().chapters.length <= 0;
		const isPreviousChapterExisting = this.novelProvider.getNovel().chapters[chapterNr - 1] !== undefined;
		const hasPreviousChapterScenes = this.novelProvider.getNovel().chapters[chapterNr - 1].scenes.length > 0;
		const hasFirstChapterAnyScenes = this.novelProvider.getNovel().chapters[0].scenes.length > 0;

		this.novelProvider.deleteChapter(chapterNr);

		if (hasNovelNoMoreChapters) {
			this.novelProvider.addChapter(0);
			this.chapterSwitcher.switchToChapterEmitter.emit({ toChapter: 0, toScene: 0});
		} else if (isPreviousChapterExisting && hasPreviousChapterScenes) {
			this.chapterSwitcher.switchToChapterEmitter.emit({ toChapter: chapterNr - 1, toScene: 0});
		} else if (hasFirstChapterAnyScenes) {
			this.chapterSwitcher.switchToChapterEmitter.emit({ toChapter: 0, toScene: 0});
		} else {
			this.novelProvider.addScene(0, 0);
			this.chapterSwitcher.switchToChapterEmitter.emit({ toChapter: 0, toScene: 0});
		}

		return this.destroyMe();
	}

	public onClickDeleteScene(chapterNr: number, sceneNr: number) {
		const isPreviousSceneExisting = this.novelProvider.getNovel().chapters[chapterNr].scenes[sceneNr - 1] !== undefined;
		const isPreviousChapterExisting = this.novelProvider.getNovel().chapters[chapterNr - 1] !== undefined;
		const hasPreviousChapterScenes = this.novelProvider.getNovel().chapters[chapterNr - 1].scenes.length > 0;

		this.novelProvider.deleteScene(chapterNr, sceneNr);

		// switch to other scene
		if (isPreviousSceneExisting) {
			this.chapterSwitcher.switchToChapterEmitter.emit({ toChapter: chapterNr, toScene: sceneNr - 1});
		} else if (isPreviousChapterExisting && hasPreviousChapterScenes) {
			this.chapterSwitcher.switchToChapterEmitter.emit({ toChapter: chapterNr - 1, toScene: 0});
		} else {
			this.novelProvider.addScene(0, 0);
			this.chapterSwitcher.switchToChapterEmitter.emit({ toChapter: 0, toScene: 0});
		}

		this.destroyMe();
	}

	public destroyMe() {
		this.destroyEmitter.emit();
	}

}
