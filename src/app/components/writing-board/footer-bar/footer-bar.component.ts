import { Component, OnInit } from '@angular/core';
import { NovelProviderService } from '../../../services/novel-provider.service';
import { Scene, Chapter, Novel } from '../../../data-models/novel.interface';
import { NovelTextChangeService } from '../../../services/novel-text-change.service';
import { ChapterSwitcherService } from '../../../services/chapter-switcher.service';

interface IWordCount { wordsInScene: number; wordsInChapter: number; wordsInNovel: number; }
interface ICharacterCount { charactersInScene: number; charactersInChapter: number; charactersInNovel: number; }

@Component({
	selector: 'app-footer-bar',
	templateUrl: './footer-bar.component.html',
	styleUrls: ['./footer-bar.component.less'],
})
export class FooterBarComponent implements OnInit {

	private wordCount: IWordCount = {
		wordsInScene: -1,
		wordsInChapter: -1,
		wordsInNovel: -1,
	};

	private characterCount: ICharacterCount = {
		charactersInScene: -1,
		charactersInChapter: -1,
		charactersInNovel: -1,
	};

	constructor(
		private readonly novelProvider: NovelProviderService,
		private readonly novelTextChangeService: NovelTextChangeService,
		private readonly chapterSwitcherService: ChapterSwitcherService,
	) { }

	private static sumReducer(previous: number, current: number) { return previous + current; }

	public ngOnInit() {

		// update word count on initialization
		const initialisationText: string = this.novelProvider.getNovel()
			.chapters[this.chapterSwitcherService.currentChapter]
			.scenes[this.chapterSwitcherService.currentScene].text;
		this.wordCount = this.updateWordCount(initialisationText);
		this.characterCount = this.updateCharacterCount(initialisationText);

		// update on text change
		this.novelTextChangeService.subscribe((currentSceneText) => {
			this.wordCount = this.updateWordCount(currentSceneText);
			this.characterCount = this.updateCharacterCount(currentSceneText);
		});

		// update on chapter switch
		this.chapterSwitcherService.switchToChapterEmitter.subscribe((values: { toChapter: number; toScene: number }) => {
			const currentSceneText: string = this.novelProvider.getNovel().chapters[values.toChapter].scenes[values.toScene].text;
			this.wordCount = this.updateWordCount(currentSceneText);
			this.characterCount = this.updateCharacterCount(currentSceneText);
		});
	}

	/**
	 *
	 */
	private updateWordCount(currentSceneText: string): IWordCount {
		const novel: Novel = this.novelProvider.getNovel();
		const chapter: Chapter = novel.chapters[this.chapterSwitcherService.currentChapter];
		const currentChapterIndex: number = this.chapterSwitcherService.currentChapter;
		const currentSceneIndex: number = this.chapterSwitcherService.currentScene;

		// 1. just count this scene easily
		const wordsInScene: number = currentSceneText.split(' ').length;

		// 2. subsctract word count of database and an own wordcount
		const wordsInChapter: number = chapter.scenes.map((scene: Scene, index: number) => {
			if (index === currentSceneIndex) { return wordsInScene; }
			return scene.text.split(' ').length;
		}).reduce(FooterBarComponent.sumReducer);

		// 3. same as in chapter, but for all chapters
		const wordsInNovel: number = novel.chapters.map((novelChapter: Chapter, index: number) => {
			if (index === currentChapterIndex) { return wordsInChapter; }
			return novelChapter.scenes
				.map((scene: Scene) => scene.text.split(' ').length)
				.reduce(FooterBarComponent.sumReducer);
		}).reduce(FooterBarComponent.sumReducer);

		return { wordsInScene, wordsInChapter, wordsInNovel };
	}

	/**
	 *
	 */
	private updateCharacterCount(currentSceneText: string): ICharacterCount {
		const novel: Novel = this.novelProvider.getNovel();
		const chapter: Chapter = novel.chapters[this.chapterSwitcherService.currentChapter];
		const currentChapterIndex: number = this.chapterSwitcherService.currentChapter;
		const currentSceneIndex: number = this.chapterSwitcherService.currentScene;

		// 1. just count this scene easily
		const charactersInScene: number = currentSceneText.length;

		// 2. subtract word count of database and an own wordcount
		const charactersInChapter: number = chapter.scenes.map((scene: Scene, index: number) => {
			if (index === currentSceneIndex) { return charactersInScene; }
			return scene.text.length;
		}).reduce(FooterBarComponent.sumReducer);

		// 3. same as in chapter, but for all chapters
		const charactersInNovel: number = novel.chapters.map((novelChapter: Chapter, index: number) => {
			if (index === currentChapterIndex) { return charactersInChapter; }
			return novelChapter.scenes
				.map((scene: Scene) => scene.text.length)
				.reduce(FooterBarComponent.sumReducer);

		}).reduce(FooterBarComponent.sumReducer);

		return { charactersInScene, charactersInChapter, charactersInNovel };
	}
}
