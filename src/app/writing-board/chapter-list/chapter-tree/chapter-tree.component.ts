import {
  Component,
  OnInit,
  ComponentRef,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { NovelProjectProviderService } from "src/app/services/novel-project-provider.service";
import {
  ChapterSwitcherService,
  DropType
} from "src/app/services/chapter-switcher.service";
import { PopUpMenuComponent } from "../../pop-up-menu/pop-up-menu.component";

@Component({
  selector: "app-chapter-tree",
  templateUrl: "./chapter-tree.component.html",
  styleUrls: ["./chapter-tree.component.less"]
})
export class ChapterTreeComponent implements OnInit {
  constructor(
    private novelProvider: NovelProjectProviderService,
    private chapterSwitcher: ChapterSwitcherService,

    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {}

  selectScene(chapterNr: number, sceneNr: number) {
    // save old text
    this.chapterSwitcher.saveTextEmitter.emit({
      chapter: this.chapterSwitcher.currentChapter,
      scene: this.chapterSwitcher.currentScene
    });
    // load new text
    this.chapterSwitcher.switchToChapterEmitter.emit({
      toChapter: chapterNr,
      toScene: sceneNr
    });
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
      this.chapterSwitcher.saveTextEmitter.emit({chapter: this.chapterSwitcher.currentChapter, scene: this.chapterSwitcher.currentScene});
      this.chapterSwitcher.switchToChapterEmitter.emit({toChapter: chapterIndex + 1, toScene: 0});
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
      this.chapterSwitcher.saveTextEmitter.emit({chapter: this.chapterSwitcher.currentChapter, scene: this.chapterSwitcher.currentScene});
      this.novelProvider.addScene(chapterIndex, sceneIndex + 1);
      this.chapterSwitcher.switchToChapterEmitter.emit({toChapter: chapterIndex, toScene: sceneIndex + 1});
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
    setTimeout(() => (this.movingChapterIndex = chapterIndex), 10);
  }

  onDragEndExistingChapter(event) {
    this.movingChapterIndex = null;
  }

  onDragOverMoveChapter(event) {
    event.preventDefault();
  }

  onDropMoveChapter(event, chapterIndex) {
    event.preventDefault();

    // move the chapter
    if (this.movingChapterIndex != null) {
      this.novelProvider.moveChapter(this.movingChapterIndex, chapterIndex);
    }

    // add scene if first chapter has none
    if (this.novelProvider.getNovel().chapters[0].scenes.length === 0) {
      this.novelProvider.addScene(0, 0);
      this.chapterSwitcher.switchToChapterEmitter.emit({toChapter: 0, toScene: 0})
    }

    // set selected cover to current one
    if (this.novelProvider.getNovel().chapters.length === 0) {
      return (this.chapterSwitcher.currentChapter = null);
    }

    if (chapterIndex < 0) {
      this.chapterSwitcher.switchToChapterEmitter.emit({toChapter: 0, toScene: 0});
    } else if (chapterIndex >= this.novelProvider.getNovel().chapters.length) {
      this.chapterSwitcher.switchToChapterEmitter.emit({toChapter: chapterIndex - 1, toScene: 0});
    } else {
      this.chapterSwitcher.switchToChapterEmitter.emit({toChapter: chapterIndex, toScene: 0});
    }
  }

  // move Scenes
  onDropMoveScene(event, newChapterIndex: number, newSceneIndex: number) {
    const [oldChapter, oldScene] = this.movingSceneIndex;

    // save old text
    this.chapterSwitcher.saveTextEmitter.emit({
      chapter: this.chapterSwitcher.currentChapter,
      scene: this.chapterSwitcher.currentScene
    });

    // move, but not if moving to the next in line
    if (!(oldChapter === newChapterIndex && newSceneIndex === oldScene + 1)) {
      this.novelProvider.moveScene(oldChapter, oldScene, newChapterIndex, newSceneIndex);
      this.movingSceneIndex = [null, null];
  
      // set selected chapter the moved one;
      const scenesLength = this.novelProvider.getNovel().chapters[newChapterIndex].scenes.length;
      // when moving a scene to the end, i have to prevent an overflow
      const newScenePosition = newSceneIndex >= scenesLength ? scenesLength - 1 : newSceneIndex
      this.chapterSwitcher.switchToChapterEmitter.emit({
        toChapter: newChapterIndex,
        toScene: newScenePosition,
      });
    }
  }

  onDragOverMoveScene(event) {
    event.preventDefault();
  }

  onDragStartExistingScene(event, chapterIndex: number, sceneIndex: number) {
    setTimeout(() => (this.movingSceneIndex = [chapterIndex, sceneIndex]), 10);
  }

  onDragEndExistingScene(event) {
    this.movingSceneIndex = [null, null];
  }

  // *************
  // context menus
  // *************

  @ViewChild("popupMenuContainer", { read: ViewContainerRef, static: true })
  chapterPopUpMenu: ViewContainerRef;
  onChapterContextMenu(event, chapterIndex: number) {
    event.preventDefault();

    // instanciation
    const chapterPopUpfactory = this.resolver.resolveComponentFactory(
      PopUpMenuComponent
    );
    const popUpMenu = this.chapterPopUpMenu.createComponent(
      chapterPopUpfactory
    );
    popUpMenu.instance.context = "chapter";
    popUpMenu.instance.chapterNr = chapterIndex;

    popUpMenu.instance.destroyEmitter.subscribe(() => {
      popUpMenu.destroy();
    });
  }

  onSceneContextMenu(event, chapterIndex: number, sceneIndex: number) {
    event.preventDefault();
    const scenePopUpFactory = this.resolver.resolveComponentFactory(
      PopUpMenuComponent
    );
    const popUpMenu = this.chapterPopUpMenu.createComponent(scenePopUpFactory);

    popUpMenu.instance.context = "scene";
    popUpMenu.instance.chapterNr = chapterIndex;
    popUpMenu.instance.sceneNr = sceneIndex;

    popUpMenu.instance.destroyEmitter.subscribe(() => {
      popUpMenu.destroy();
    });
  }
}
