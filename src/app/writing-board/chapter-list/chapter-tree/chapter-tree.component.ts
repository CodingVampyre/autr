import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef
} from "@angular/core";
import { NovelProjectProviderService } from "src/app/services/novel-project-provider.service";
import {
  ChapterSwitcherService,
  DropType
} from "src/app/services/chapter-switcher.service";

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

  onDragOverChapter(event) {
    event.preventDefault();
    if (this.chapterSwitcher.dragContent === DropType.CHAPTER) {
      // TODO change style

      if (!event.target.className.includes('chapter-drop-zone-highlight')) {
        event.target.classList.add("chapter-drop-zone-highlight");
      }
    }
  }

  onDragLeaveChapter(event) {
    if (event.target.className.includes('chapter-drop-zone-highlight')) {
      event.target.classList.remove("chapter-drop-zone-highlight");
    }
  }

  onDropChapter(event) {
    if (this.chapterSwitcher.dragContent === DropType.CHAPTER) {
      if (event.target.className.includes('chapter-drop-zone-highlight')) {
        event.target.classList.remove("chapter-drop-zone-highlight");
      }

      console.log("adding chapter");
      // TODO add chapter here
    }
  }
}
