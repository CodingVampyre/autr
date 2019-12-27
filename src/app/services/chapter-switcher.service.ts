import { Injectable, EventEmitter } from '@angular/core';
import {NovelProviderService} from './novel-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ChapterSwitcherService {

	public switchToChapterEmitter = new EventEmitter<{toChapter: number, toScene: number}>();
	public saveTextEmitter = new EventEmitter<{chapter: number, scene: number}>();
	public currentChapter: number = 0;
	public currentScene: number = 0;

  // drag and drop of new stuff
  public dragContent: DropType = DropType.NONE;

	constructor(
		private novelProjectProviderService: NovelProviderService,
	) {
		this.switchToChapterEmitter.subscribe((event) => {
			this.currentChapter = event.toChapter;
			this.currentScene = event.toScene;

			this.novelProjectProviderService.getNovel().cursor.currentChapter = event.toChapter;
			this.novelProjectProviderService.getNovel().cursor.currentScene = event.toScene;
		});
	}
}

export enum DropType {
	NONE,
	CHAPTER,
	SCENE,
	NOTE
}
