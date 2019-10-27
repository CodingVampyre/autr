import { Injectable } from "@angular/core";
import { Novel, Chapter, Scene } from "../data-models/novel.interface";

@Injectable({
	providedIn: "root"
})
export class NovelProjectProviderService {
	private novel: Novel;

	constructor() { }

	public getNovel() {
		return this.novel;
	}

	public setNovel(novel: Novel) {
		this.novel = novel;
	}

	/**
	 * adds a chapter to the novel
	 */
	public addChapter(chapterPosition: number) {
		if (
			chapterPosition > this.getNovel().chapters.length ||
			chapterPosition < 0
		) {
			throw new Error("can't add chapter after end of novel");
		}

		const chapter: Chapter = { name: "new chapter", scenes: [] };
		this.getNovel().chapters.splice(chapterPosition, 0, chapter);
		this.addScene(chapterPosition, 0);
	}

	/**
	 * adds a scene to the novel
	 */
	public addScene(chapterNr: number, scenePosition: number) {
		if (chapterNr < 0 || chapterNr >= this.getNovel().chapters.length) {
			throw new Error("can't add scene to unknown chapter");
		}

		const scene: Scene = {name: "new scene", text: ""}
		this.getNovel().chapters[chapterNr].scenes.splice(
			scenePosition, 0, scene
		);
	}

	/**
	 *
	 */
	public moveChapter(chapterNr: number, newPosition: number) {
		// error prevention
		if (chapterNr < 0 || chapterNr > this.novel.chapters.length)
			throw new Error("chapterNr out of bounds");
		if (newPosition < 0) newPosition = 0;
		else if (newPosition > this.novel.chapters.length)
			newPosition = this.novel.chapters.length;

		// move chapter
		const chapterToMove: Chapter = this.novel.chapters[chapterNr];
		this.novel.chapters.splice(chapterNr, 1); // delete old
		if (newPosition > chapterNr)
			this.novel.chapters.splice(newPosition + 1, 0, chapterToMove);
		// insert after deleted point
		else this.novel.chapters.splice(newPosition, 0, chapterToMove); // insert new before deleted point
	}

	/**
	 *
	 */
	public moveScene(
		fromChapter: number,
		fromScene: number,
		toChapter: number,
		toScenePosition: number
	) {
		const sceneToMove = this.novel.chapters[fromChapter].scenes[fromScene];
		this.novel.chapters[fromChapter].scenes.splice(fromScene, 1); // delete old
		if (fromChapter === toChapter) {
			// check if this chapter must be manipulated
			if (toScenePosition > fromScene)
				this.novel.chapters[toChapter].scenes.splice(
					toScenePosition + 1,
					0,
					sceneToMove
				);
			else
				this.novel.chapters[toChapter].scenes.splice(
					toScenePosition,
					0,
					sceneToMove
				);
		} else {
			// just insert without doubt
			this.novel.chapters[toChapter].scenes.splice(
				toScenePosition,
				0,
				sceneToMove
			);
		}
	}

	/**
	 *
	 */
	deleteChapter(chapterNr: number) {
		this.novel.chapters.splice(chapterNr, 1);
	}

	/**
	 *
	 */
	deleteScene(chapterNr: number, sceneNr: number) {
		this.novel.chapters[chapterNr].scenes.splice(sceneNr, 1);
	}

	/**
	 *
	 */
	renameChapter(chapterNr: number, newName: string) {
		this.novel.chapters[chapterNr].name = newName;
	}

	/**
	 *
	 */
	renameScene(chapterNr: number, sceneNr: number, sceneNewName: string) {
		this.novel.chapters[chapterNr].scenes[sceneNr].name = sceneNewName;
	}
}
