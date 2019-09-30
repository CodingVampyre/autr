import { Component, OnInit } from '@angular/core';
import { NovelProjectProviderService } from 'src/app/services/novel-project-provider.service';
import { ChapterSwitcherService } from 'src/app/services/chapter-switcher.service';

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
    console.log(this.novelService.getNovel().chapters[this.chapterSwitcher.currentChapter].scenes[this.chapterSwitcher.currentScene].text);
  }

}
