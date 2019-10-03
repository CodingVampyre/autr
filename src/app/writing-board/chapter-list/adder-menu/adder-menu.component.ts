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
    if (type === 'chapter') {
      this.chapterSwitcher.dragContent = DropType.CHAPTER;
    }
  }

  onDragEnd(event) {
    this.chapterSwitcher.dragContent = DropType.NONE;
  }

}
