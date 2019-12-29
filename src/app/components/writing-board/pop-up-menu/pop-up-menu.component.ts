import { Component, Input, Output } from '@angular/core';
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

	@Output() public closePopUpMenu: EventEmitter<void> = new EventEmitter();

	constructor(
		public novelProvider: NovelProviderService,
		public chapterSwitcher: ChapterSwitcherService,
	) { }

	public renameChapter(chapterNewName: string) {
		this.novelProvider.renameChapter(this.chapterNr, chapterNewName);
	}

	public renameScene(sceneNewName: string) {
		this.novelProvider.renameScene(this.chapterNr, this.sceneNr, sceneNewName);
	}

	public onClickDeleteChapter(chapterNr: number) {
		this.novelProvider.deleteChapter(chapterNr);

		if (this.novelProvider.getNovel().chapters.length <= 0) {
			this.novelProvider.addChapter(0);
			this.chapterSwitcher.switchToChapterEmitter.emit({ toChapter: 0, toScene: 0});
		} else if (this.novelProvider.getNovel().chapters[chapterNr - 1] !== undefined
			&& this.novelProvider.getNovel().chapters[chapterNr - 1].scenes.length > 0) {
			this.chapterSwitcher.switchToChapterEmitter.emit({ toChapter: chapterNr - 1, toScene: 0});
		} else if (this.novelProvider.getNovel().chapters[0].scenes.length > 0) {
			this.chapterSwitcher.switchToChapterEmitter.emit({ toChapter: 0, toScene: 0});
		} else {
			this.novelProvider.addScene(0, 0);
			this.chapterSwitcher.switchToChapterEmitter.emit({ toChapter: 0, toScene: 0});
		}

		return this.closePopUpMenu.emit();
	}

	public onClickDeleteScene(chapterNr: number, sceneNr: number) {
		let toSceneInChapter;

		this.novelProvider.deleteScene(chapterNr, sceneNr);

		// switch to other scene
		if (this.novelProvider.getNovel().chapters[chapterNr].scenes[sceneNr] !== undefined) {
			toSceneInChapter = { toChapter: chapterNr, toScene: sceneNr };
		} else if (this.novelProvider.getNovel().chapters[chapterNr].scenes[sceneNr - 1] !== undefined) {
			toSceneInChapter = { toChapter: chapterNr, toScene: sceneNr - 1};
		} else if (this.novelProvider.getNovel().chapters[chapterNr].scenes.length <= 0) {
			this.novelProvider.addScene(chapterNr, 0);
			toSceneInChapter = { toChapter: chapterNr, toScene: 0};
		} else {
			this.novelProvider.addScene(0, 0);
			toSceneInChapter = { toChapter: 0, toScene: 0};
		}

		this.chapterSwitcher.switchToChapterEmitter.emit(toSceneInChapter);
		return this.closePopUpMenu.emit();
	}

	public close() {
		this.closePopUpMenu.emit();
	}
}
