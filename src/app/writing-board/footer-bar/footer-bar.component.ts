import { Component, OnInit } from '@angular/core';
import { NovelProjectProviderService } from 'src/app/services/novel-project-provider.service';
import { Scene, Chapter, Novel } from '../../data-models/novel.interface';
import { NovelTextChangeService } from 'src/app/services/novel-text-change.service';
import { ChapterSwitcherService } from 'src/app/services/chapter-switcher.service';

type WordCount = { wordsInScene: number, wordsInChapter: number, wordsInNovel: number }
type CharacterCount = { charactersInScene: number, charactersInChapter: number, charactersInNovel: number }

@Component({
	selector: 'app-footer-bar',
	templateUrl: './footer-bar.component.html',
	styleUrls: ['./footer-bar.component.less']
})
export class FooterBarComponent implements OnInit {

	private wordCount: WordCount = {
		wordsInScene: -1,
		wordsInChapter: -1,
		wordsInNovel: -1,
	}

	private characterCount: CharacterCount = {
		charactersInScene: -1,
		charactersInChapter: -1,
		charactersInNovel: -1,
	}

	constructor(
		private readonly novelProvider: NovelProjectProviderService,
		private readonly novelTextChangeService: NovelTextChangeService,
		private readonly chapterSwitcherService: ChapterSwitcherService,
	) { }

	ngOnInit() {
		// update on text change
		this.novelTextChangeService.subscribe((currentSceneText) => {
			this.wordCount = this.updateWordCount(currentSceneText);
		});

		// update on chapter switch
		this.chapterSwitcherService.switchToChapterEmitter.subscribe((values: {toChapter: number, toScene: number}) => {
			const currentSceneText: string = this.novelProvider.getNovel().chapters[values.toChapter].scenes[values.toScene].text;
			this.wordCount = this.updateWordCount(currentSceneText);
		})
	}

	/**
	 * 
	 */
	private updateWordCount(currentSceneText: string): WordCount {
		const novel: Novel = this.novelProvider.getNovel();
		const chapter: Chapter = novel.chapters[this.chapterSwitcherService.currentChapter];
		const currentChapterIndex: number = this.chapterSwitcherService.currentChapter;
		const currentSceneIndex: number = this.chapterSwitcherService.currentScene;

		// 1. just count this scene easily
		const wordsInScene: number = currentSceneText.split(' ').length;

		// 2. subsctract word count of database and an own wordcount
		const wordsInChapter: number = chapter.scenes.map((scene: Scene, index: number) => {
			if (index === currentSceneIndex) { return wordsInScene }
			else { return scene.text.split(' ').length }
		}).reduce(FooterBarComponent.sumReducer);

		// 3. same as in chapter, but for all chapters
		const wordsInNovel: number = novel.chapters.map((chapter: Chapter, index: number) => {
			if (index === currentChapterIndex) { 
				return wordsInChapter 
			} else {
				return chapter.scenes.map((scene: Scene) => scene.text.split(' ').length)
					.reduce(FooterBarComponent.sumReducer);
			}
		}).reduce(FooterBarComponent.sumReducer);

		return { wordsInScene, wordsInChapter, wordsInNovel }
	}

	private static sumReducer(previous: number, current: number) { return previous + current }
}
