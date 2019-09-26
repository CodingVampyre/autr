import { Component, OnInit } from '@angular/core';
import { NovelProjectProviderService } from 'src/app/novel-project-provider.service';
import { ChapterSwitcherService } from 'src/app/communication/chapter-switcher.service';

@Component({
  selector: 'app-writing-panel',
  templateUrl: './writing-panel.component.html',
  styleUrls: ['./writing-panel.component.less']
})
export class WritingPanelComponent implements OnInit {

  constructor(
    private novelService: NovelProjectProviderService,
    private chapterSwitcher: ChapterSwitcherService,
  ) { }

  ngOnInit() {
  }

  onChange() {
  }

}
