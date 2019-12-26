import {
	Component,
	ComponentFactoryResolver, ElementRef,
	ViewChild,
} from '@angular/core';
import { NovelProviderService } from '../../../../services/novel-provider.service';
import {
	ChapterSwitcherService,
	DropType,
} from '../../../../services/chapter-switcher.service';
import { PopUpMenuComponent } from '../../pop-up-menu/pop-up-menu.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

/** used to order chapters and scenes */
@Component({
	selector: 'app-chapter-tree',
	templateUrl: './chapter-tree.component.html',
	styleUrls: ['./chapter-tree.component.less'],
	animations: [
		trigger('slideBottomToTopAnimation', [
			// normal state while existing
			state('in', style({ opacity: 1 })),
			// on creation of an instance
			transition(':enter', [
				style({ opacity: 0 }),
				animate('0.1s'),
			]),
			// on leave
			transition(':leave', [
				animate('0.1s'),
				style({ opacity: 0 }),
			]),
		]),
	],
})
export class ChapterTreeComponent {

	/** pop up menu used to edit metadata */
	@ViewChild('popUpMenu', { read: PopUpMenuComponent, static: false })
	public popUpMenu: ElementRef<PopUpMenuComponent>;

	/**  */
	private movingChapterIndex?: number;

	/** */
	private movingSceneIndex: [number?, number?] = [undefined, undefined];

	/**  */
	private showPopUpMenu = false;

	private popUpContext;
	private popUpChapter;
	private popUpScene;

	/**
	 * default constructor
	 * @param novelProvider provides the main data of th novel
	 * @param chapterSwitcher assists in switching chapters comfortably
	 * @param resolver used to spawn components
	 */
	constructor(
		private novelProvider: NovelProviderService,
		private chapterSwitcher: ChapterSwitcherService,
		private resolver: ComponentFactoryResolver,
	) { }

	/**
	 * makes a scene the current scene and tells other components about the currently selected scene
	 * @param chapterNr the chapter that is selected
	 * @param sceneNr the scene that is selected
	 * @return void
	 */
	public selectScene(chapterNr: number, sceneNr: number): void {
		// save old text
		this.chapterSwitcher.saveTextEmitter.emit({
			chapter: this.chapterSwitcher.currentChapter,
			scene: this.chapterSwitcher.currentScene,
		});
		// load new text
		this.chapterSwitcher.switchToChapterEmitter.emit({
			toChapter: chapterNr,
			toScene: sceneNr,
		});
	}

	/**
	 * triggered when something is dragged over a chapter
	 * @param event the event itself
	 */
	public onDragOverChapter(event): void {
		event.preventDefault();
		if (this.chapterSwitcher.dragContent === DropType.CHAPTER) {
			if (!event.target.className.includes('drop-zone-highlight')) {
				event.target.classList.add('drop-zone-highlight');
			}
		}
	}

	/**
	 * triggered if a floating object leaves the scope of an object.
	 * will affect style
	 * @param event the event itself
	 */
	public onDragLeaveChapter(event): void {
		if (event.target.className.includes('drop-zone-highlight')) {
			event.target.classList.remove('drop-zone-highlight');
		}
	}

	/**
	 * triggered if something is dropped in the slot of a new chapter
	 * @param event the event itself
	 * @param chapterIndex index of the chapter
	 */
	public onDropChapter(event, chapterIndex: number): void {
		// make sure the dropped object really is a chapter
		if (this.chapterSwitcher.dragContent === DropType.CHAPTER) {
			// adds a class to the highlighted zone to remove special effects from mouseover
			if (event.target.className.includes('chapter-drop-zone-highlight')) {
				event.target.classList.remove('chapter-drop-zone-highlight');
			}
			// save old chapter text
			this.chapterSwitcher.saveTextEmitter.emit({ chapter: this.chapterSwitcher.currentChapter, scene: this.chapterSwitcher.currentScene});
			// add the new chapter
			this.novelProvider.addChapter(chapterIndex + 1);
			// switch to the new chapter
			this.chapterSwitcher.switchToChapterEmitter.emit({ toChapter: chapterIndex + 1, toScene: 0});
		}
	}

	/**
	 * triggered if something is dragged over a scene
	 * @param event the event itself
	 */
	public onDragOverScene(event) {
		event.preventDefault();
		if (this.chapterSwitcher.dragContent === DropType.SCENE) {
			if (!event.target.className.includes('drop-zone-highlight')) {
				event.target.classList.add('drop-zone-highlight');
			}
		}
	}

	/**
	 * triggered if something is dragged away from a scene scope
	 * used for style purposes
	 * @param event the event itself
	 */
	public onDragLeaveScene(event) {
		if (event.target.className.includes('drop-zone-highlight')) {
			event.target.classList.remove('drop-zone-highlight');
		}
	}

	/**
	 * triggered when dropping a scene onto a gap
	 * used to add new scenes
	 * @param event he event itself
	 * @param chapterIndex index of the chapter index this chapter will have after adding
	 * @param sceneIndex index of the scene this scene is dropped next to
	 */
	public onDropScene(event, chapterIndex: number, sceneIndex: number): void {
		if (this.chapterSwitcher.dragContent === DropType.SCENE) {
			if (event.target.className.includes('scene-drop-zone-highlight')) {
				event.target.classList.remove('scene-drop-zone-highlight');
			}
			this.chapterSwitcher.saveTextEmitter.emit({ chapter: this.chapterSwitcher.currentChapter, scene: this.chapterSwitcher.currentScene});
			this.novelProvider.addScene(chapterIndex, sceneIndex + 1);
			this.chapterSwitcher.switchToChapterEmitter.emit({ toChapter: chapterIndex, toScene: sceneIndex + 1});
		}
	}

	/**
	 * triggered when starting to drag a chapter
	 * @param chapterIndex the chapter that is dragged
	 */
	public onDragStartExistingChapter(chapterIndex: number): void {
		const timeToWaitMs = 10;
		// setTimeout prevents a bug that fires the dragleave immediately after starting to drag.
		// may be fixed in future versions
		setTimeout(() => (this.movingChapterIndex = chapterIndex), timeToWaitMs);
	}

	/**
	 * triggered when stopping drag
	 * used to wipe information on what chapter was dragged
	 * @param event the event itself
	 */
	public onDragEndExistingChapter(event): void {
		this.movingChapterIndex = undefined;
	}

	/**
	 * triggered when hovering over a chapter landing space.
	 * avoids browsers default behaviour
	 * @param event the event itself
	 */
	public onDragOverMoveChapter(event) {
		event.preventDefault();
		if (!event.target.classList.contains('drop-zone-highlight')) {
			event.target.classList.add('drop-zone-highlight');
		}
	}

	/**
	 * triggered when hovering something above the scene landing zone
	 * @param event the event itself
	 */
	public onDragOverMoveScene(event) {
		event.preventDefault();
		if (!event.target.classList.contains('drop-zone-highlight')) {
			event.target.classList.add('drop-zone-highlight');
		}
	}

	/**
	 * triggered when a chapter is dropped into it's landing zone
	 * @param event the event itself
	 * @param chapterIndex the index of the chapter it is dropped to
	 */
	public onDropMoveChapter(event, chapterIndex) {
		event.preventDefault();

		// move the chapter
		if (this.movingChapterIndex !== undefined) {
			this.novelProvider.moveChapter(this.movingChapterIndex, chapterIndex);
		}

		// add scene if first chapter has none
		if (this.novelProvider.getNovel().chapters[0].scenes.length === 0) {
			this.novelProvider.addScene(0, 0);
			this.chapterSwitcher.switchToChapterEmitter.emit({ toChapter: 0, toScene: 0});
		}

		// set selected cover to current one
		if (this.novelProvider.getNovel().chapters.length === 0) {
			return (this.chapterSwitcher.currentChapter = undefined);
		}

		// determine correct scene positioning
		if (chapterIndex < 0) {
			chapterIndex = 0;
		} else if (chapterIndex >= this.novelProvider.getNovel().chapters.length ) {
			chapterIndex = chapterIndex - 1;
		}
		this.chapterSwitcher.switchToChapterEmitter.emit({ toChapter: chapterIndex, toScene: 0 });
	}

	/**
	 * triggered when a scene is dropped
	 * @param event the event itself
	 * @param newChapterIndex index of the chapter the scene is dropped to
	 * @param newSceneIndex index of the scene position the scene is dropped to
	 * it is dropped to places too deep
	 */
	public onDropMoveScene(event, newChapterIndex: number, newSceneIndex: number) {
		const [oldChapterIndex, oldSceneIndex] = this.movingSceneIndex;

		// save old text
		this.chapterSwitcher.saveTextEmitter.emit({
			chapter: this.chapterSwitcher.currentChapter,
			scene: this.chapterSwitcher.currentScene,
		});

		// move, but not if moving to the next in line
		newSceneIndex = this.novelProvider
			.moveScene(oldChapterIndex, oldSceneIndex, newChapterIndex, newSceneIndex);
		this.movingSceneIndex = [undefined, undefined];

		// set selected chapter the moved one;
		this.chapterSwitcher.switchToChapterEmitter.emit({
			toChapter: newChapterIndex,
			toScene: newSceneIndex,
		});
	}

	/**
	 * triggered when a scene is dragged
	 * @param event the event itself
	 * @param chapterIndex the chapter from which a scene derives
	 * @param sceneIndex the scene that is dragged
	 */
	public onDragStartExistingScene(event, chapterIndex: number, sceneIndex: number): void {
		const timeToWaitMs = 10;
		setTimeout(() => (this.movingSceneIndex = [chapterIndex, sceneIndex]), timeToWaitMs);
	}

	/**
	 * triggered when a scene is left fallen while dragging
	 * @param event the event itself
	 */
	public onDragEndExistingScene(event) {
		this.movingSceneIndex = [undefined, undefined];
	}

	/**
	 * opens the context menu for chapters
	 * @param event the opening event
	 * @param chapterIndex the chapter to be edited
	 */
	public onChapterContextMenu(event, chapterIndex: number): void {
		event.preventDefault();

		// instantiation
		this.popUpContext = 'chapter';
		this.popUpChapter = chapterIndex;
		this.popUpScene = undefined;

		this.showPopUpMenu = true;
	}

	/**
	 * opens the context menu and creates it
	 * @param event the opening event
	 * @param chapterIndex the chapter to edit
	 * @param sceneIndex the scene to edit
	 */
	public onSceneContextMenu(event, chapterIndex: number, sceneIndex: number): void {
		event.preventDefault();

		this.popUpContext = 'scene';
		this.popUpChapter = chapterIndex;
		this.popUpScene = sceneIndex;

		this.showPopUpMenu = true;
	}

	/**
	 * toggles scenes
	 * @param chapterIndex
	 */
	public onClickChapter(chapterIndex: number) {
		this.novelProvider.getNovel().chapters[chapterIndex].areScenesVisible = !this.novelProvider.getNovel().chapters[chapterIndex].areScenesVisible;
	}
}
