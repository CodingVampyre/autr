import { Injectable } from '@angular/core';
import { Novel, Chapter, Scene } from 'src/app/data-models/novel.interface';

@Injectable({
	providedIn: 'root'
})
export class NovelToTextService {

	constructor() { }

	/**
	 * convertes a novel to txt, asciidoc format
	 * @param novel {Novel}
	 * @returns text {string} ASCIIDOC conforming string
	 */
	public static convertNovelToText(novel: Novel): string {
		let text = ``;

		text += '# NOVEL: ' + novel.name + '\n';
		novel.chapters.map((chapter: Chapter) => {
			text += '\n## CHAPTER: ' + chapter.name + '\n';
			chapter.scenes.map((scene: Scene) => {
				text += '### SCENE: ' + scene.name + '\n';
				text += scene.text + '\n\n';
			});
		});

		return text;
	}
}
