import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChapterSwitcherService {

  public chapterSwitcher = new EventEmitter<[number, number]>();
  public currentChapter: number = 0;
  public currentScene: number = 0;

  constructor() { 
    this.chapterSwitcher.subscribe((event) => {
      [this.currentChapter, this.currentScene] = event;
    });
  }
}
