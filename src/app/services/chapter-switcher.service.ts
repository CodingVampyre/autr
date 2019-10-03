import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChapterSwitcherService {

  public chapterSwitcher = new EventEmitter<[number, number]>();
  public currentChapter: number = 0;
  public currentScene: number = 0;

  // drag and drop of new stuff
  public dragContent: DropType = DropType.NONE;

  constructor() { 
    this.chapterSwitcher.subscribe((event) => {
      [this.currentChapter, this.currentScene] = event;
    });
  }
}

export enum DropType {
  NONE, CHAPTER, SCENE, NOTE
}
