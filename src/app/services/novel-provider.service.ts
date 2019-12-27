import { Injectable } from '@angular/core';
import { Novel, Chapter, Scene } from '../data-models/novel.interface';

@Injectable({
	providedIn: 'root',
})
export class NovelProviderService {

	/** id for database storage */
	public novelId: string;

	/** main novel to work with */
	private novel: Novel;

	/**
	 * returns the novel itself
	 * @return {Novel} the novel
	 */
	public getNovel(): Novel {
		return this.novel;
	}

	/**
	 * sets a novel to handle internally
	 * @param novel
	 */
	public setNovel(novel: Novel) {
		this.novel = novel;
	}

	/**
	 * adds a chapter to the novel
	 * @param chapterPosition the position to add the chapter to
	 */
	public addChapter(chapterPosition: number): void {
		const isChapterPositionBehindLastChapter = chapterPosition > this.getNovel().chapters.length;
		const isChapterPositionBelowZero = chapterPosition < 0;
		const chapter: Chapter = { name: 'new chapter', scenes: [], areScenesVisible: false };

		// check if chapter positions are set correctly
		if (isChapterPositionBehindLastChapter || isChapterPositionBelowZero) {
			throw new Error('can\'t add chapter after end of novel');
		}

		// add the chapter and an empty scene to avoid empty chapters
		this.getNovel().chapters.splice(chapterPosition, 0, chapter);
		this.addScene(chapterPosition, 0);
	}

	/**
	 * adds a scene to the novel
	 * @param chapterNr the chapter in which the scene will be added
	 * @param scenePosition the position the scene is added to
	 */
	public addScene(chapterNr: number, scenePosition: number): void {
		const isChapterBelowZero = chapterNr < 0;
		const isChapterNumberAboveLastChapter = chapterNr >= this.getNovel().chapters.length;
		const scene: Scene = { name: 'new scene', text: ''};

		// check if new chapter position is in bounds
		if (isChapterBelowZero || isChapterNumberAboveLastChapter) {
			throw new Error('can\'t add scene to unknown chapter');
		}

		// add the chapter
		this.getNovel().chapters[chapterNr].scenes.splice(
			scenePosition, 0, scene,
		);
	}

	/**
	 *
	 */
	public moveChapter(fromChapter: number, toChapter: number) {
		// error prevention
		if (fromChapter < 0 || fromChapter > this.novel.chapters.length) {
			throw new Error('chapterNr out of bounds');
		}

		// clamping
		if (toChapter < 0) {
			toChapter = 0;
		} else if (toChapter > this.novel.chapters.length) {
			toChapter = this.novel.chapters.length;
		}

		// move chapter
		const chapterToMove: Chapter = this.novel.chapters[fromChapter];

		// delete old
		this.novel.chapters.splice(fromChapter, 1);

		// insert new
		if (toChapter > fromChapter) { toChapter -= 1; }
		this.novel.chapters.splice(toChapter, 0, chapterToMove);
	}

	/**
	 *
	 */
	public moveScene(
		fromChapter: number,
		fromScene: number,
		toChapter: number,
		toScenePosition: number,
	) {
		const sceneToMove = this.novel.chapters[fromChapter].scenes[fromScene];
		this.novel.chapters[fromChapter].scenes.splice(fromScene, 1); // delete old

		if (fromChapter === toChapter && toScenePosition > fromScene) { toScenePosition -= 1; }
		this.novel.chapters[toChapter].scenes.splice(toScenePosition, 0, sceneToMove);

		return toScenePosition;
	}

	/**
	 *
	 */
	public deleteChapter(chapterNr: number) {
		this.novel.chapters.splice(chapterNr, 1);
	}

	/**
	 *
	 */
	public deleteScene(chapterNr: number, sceneNr: number) {
		this.novel.chapters[chapterNr].scenes.splice(sceneNr, 1);
	}

	/**
	 *
	 */
	public renameChapter(chapterNr: number, newName: string) {
		this.novel.chapters[chapterNr].name = newName;
	}

	/**
	 *
	 */
	public renameScene(chapterNr: number, sceneNr: number, sceneNewName: string) {
		this.novel.chapters[chapterNr].scenes[sceneNr].name = sceneNewName;
	}
}
