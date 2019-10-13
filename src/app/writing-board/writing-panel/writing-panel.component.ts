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

    // executed before moving
    this.chapterSwitcher.saveTextEmitter.subscribe((newData) => {
      // store old text in matching chapter
      this.novelService.getNovel().chapters[newData.chapter].scenes[newData.scene].text = this.currentSceneText;
    });

    // load new text whenever a scene is switched, executed after moving
    this.chapterSwitcher.switchToChapterEmitter.subscribe((event) => {
      // set text to new text
      this.currentSceneText = this.novelService.getNovel().chapters[event.toChapter].scenes[event.toScene].text;
    });
  }

  onChange() {
    console.log(this.currentSceneText);
  }

}
