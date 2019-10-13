import { Injectable, EventEmitter } from '@angular/core';

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

  constructor() { 
    this.switchToChapterEmitter.subscribe((event) => {
      this.currentChapter = event.toChapter;
      this.currentScene = event.toScene;
    });
  }
}

export enum DropType {
  NONE, CHAPTER, SCENE, NOTE
}
