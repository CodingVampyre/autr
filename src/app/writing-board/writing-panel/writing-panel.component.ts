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

  currentSceneText: string;

  ngOnInit() {
    // load text from novel Provider to current Writing panel
    this.currentSceneText = this.novelService.getNovel().chapters[this.chapterSwitcher.currentChapter].scenes[this.chapterSwitcher.currentScene].text;

    // load new text whenever a scene is switched
    this.chapterSwitcher.chapterSwitcher.subscribe((event) => {
      // store old text in matchign chapter
      this.novelService.getNovel().chapters[event[2]].scenes[event[3]].text = this.currentSceneText;
      // set text to new text
      this.currentSceneText = this.novelService.getNovel().chapters[event[0]].scenes[event[1]].text;
    });
  }

  onChange() {
    console.log(this.currentSceneText);
  }

}
