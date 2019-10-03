import { Component, OnInit} from '@angular/core';
import { ChapterSwitcherService, DropType } from 'src/app/services/chapter-switcher.service';

@Component({
  selector: 'app-adder-menu',
  templateUrl: './adder-menu.component.html',
  styleUrls: ['./adder-menu.component.less']
})
export class AdderMenuComponent implements OnInit {

  constructor(
    private chapterSwitcher: ChapterSwitcherService,
  ) { }

  ngOnInit() {
  }

  onDragStart(event, type) {
    switch (type) {
      case 'chapter': this.chapterSwitcher.dragContent = DropType.CHAPTER; break;
      case 'scene': this.chapterSwitcher.dragContent = DropType.SCENE; break;
      default: this.chapterSwitcher.dragContent = DropType.NONE;
    }
  }

  onDragEnd(event) {
    this.chapterSwitcher.dragContent = DropType.NONE;
  }

}
