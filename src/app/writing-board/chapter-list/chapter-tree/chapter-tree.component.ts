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

  // CHAPTER STUFF
  onDragOverChapter(event) {
    event.preventDefault();
    if (this.chapterSwitcher.dragContent === DropType.CHAPTER) {
      if (!event.target.className.includes("chapter-drop-zone-highlight")) {
        event.target.classList.add("chapter-drop-zone-highlight");
      }
    }
  }

  onDragLeaveChapter(event) {
    if (event.target.className.includes("chapter-drop-zone-highlight")) {
      event.target.classList.remove("chapter-drop-zone-highlight");
    }
  }

  onDropChapter(event, chapterIndex: number) {
    if (this.chapterSwitcher.dragContent === DropType.CHAPTER) {
      if (event.target.className.includes("chapter-drop-zone-highlight")) {
        event.target.classList.remove("chapter-drop-zone-highlight");
      }
      this.novelProvider.addChapter(chapterIndex + 1);
    }
  }

  // SCENE STUFF
  onDragOverScene(event) {
    event.preventDefault();
    if (this.chapterSwitcher.dragContent === DropType.SCENE) {
      if (!event.target.className.includes("scene-drop-zone-highlight")) {
        event.target.classList.add("scene-drop-zone-highlight");
      }
    }
  }

  onDragLeaveScene(event) {
    if (event.target.className.includes("scene-drop-zone-highlight")) {
      event.target.classList.remove("scene-drop-zone-highlight");
    }
  }

  onDropScene(event, chapterIndex: number, sceneIndex: number) {
    if (this.chapterSwitcher.dragContent === DropType.SCENE) {
      if (event.target.className.includes("scene-drop-zone-highlight")) {
        event.target.classList.remove("scene-drop-zone-highlight");
      }
      this.novelProvider.addScene(chapterIndex, sceneIndex + 1);
    }
  }

  // *************
  // Move Chapters
  // *************

  private movingChapterIndex: number | null = null;
  private movingSceneIndex: [number | null, number | null] = [null, null];

  // Move Chapters
  onDragStartExistingChapter(chapterIndex: number) {
    // setTimeout prevents a bug that fires the dragleave immediatly after starting to drag.
    // may be fixed in future versions
    setTimeout(() => this.movingChapterIndex = chapterIndex, 10);
  }

  onDragEndExistingChapter(event) {
    this.movingChapterIndex = null;
  }

  onDragOverMoveChapter(event) {
    event.preventDefault();
  }

  onDropMoveChapter(event, chapterIndex) {
    event.preventDefault();
    if (this.movingChapterIndex != null) {
      this.novelProvider.moveChapter(this.movingChapterIndex, chapterIndex);
    }
  }

  // move Scenes
  onDropMoveScene(event, chapterIndex: number, sceneIndex: number) {
    this.novelProvider.moveScene(this.movingSceneIndex[0], this.movingSceneIndex[1], chapterIndex, sceneIndex);
    this.movingSceneIndex = [null, null];
  }

  onDragOverMoveScene(event) {
    event.preventDefault();
  }

  onDragStartExistingScene(event, chapterIndex: number, sceneIndex: number) {
    setTimeout(() => this.movingSceneIndex = [chapterIndex, sceneIndex], 10);
  }

  onDragEndExistingScene(event) {
    this.movingSceneIndex = [null, null];
  }

  // *************
  // context menus
  // *************
  onChapterContextMenu(event, chapterIndex: number) {
    event.preventDefault();
    console.log("ContextMenuWillBeEnabled");
  }

  onSceneContextMenu(event, chapterIndex: number, sceneIndex) {
    event.preventDefault();
    console.log("ContextMenuWillBeEnabled2");
  }
}
