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

  /** chapter that is currently in work */
  private selectedChapterNr = 0;

  /** scene that is currently in work */
  private selectedSceneNumber = 0;

  /**
   * sets the current model of a scene to write against it.
   * To be used by the chapter selector
   */
  public selectScene(chapter: number, scene: number) {
    this.selectedChapterNr = chapter;
    this.selectedSceneNumber = scene;
  }

  ngOnInit() {
    this.chapterSwitcher.chapterSwitcher.subscribe((data) => {
      this.selectScene(data[0], data[1]);
    })
  }

  onChange() {
  }

}
