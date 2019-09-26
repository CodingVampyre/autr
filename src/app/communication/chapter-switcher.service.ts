import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChapterSwitcherService {

  public chapterSwitcher = new EventEmitter<[number, number]>();

  constructor() { }
}
