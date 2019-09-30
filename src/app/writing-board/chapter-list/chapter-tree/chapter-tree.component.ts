import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NovelProjectProviderService } from "src/app/services/novel-project-provider.service";
import { ChapterSwitcherService } from "src/app/services/chapter-switcher.service";

@Component({
  selector: "app-chapter-tree",
  templateUrl: "./chapter-tree.component.html",
  styleUrls: ["./chapter-tree.component.less"]
})
export class ChapterTreeComponent implements OnInit {

  constructor(
    private novelProvider: NovelProjectProviderService,
    private chapterSwitcher: ChapterSwitcherService
  ) {}

  ngOnInit() {}

  selectScene(chapterNr: number, sceneNr: number) {
    this.chapterSwitcher.chapterSwitcher.emit([chapterNr, sceneNr]);
  }
}
