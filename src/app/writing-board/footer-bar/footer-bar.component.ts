import { Component, OnInit } from '@angular/core';
import { NovelProjectProviderService } from 'src/app/services/novel-project-provider.service';
import { Scene, Chapter, Novel } from '../../data-models/novel.interface';
import { NovelTextChangeService } from 'src/app/services/novel-text-change.service';
import { ChapterSwitcherService } from 'src/app/services/chapter-switcher.service';
import { TouchSequence } from 'selenium-webdriver';

type WordCount = { wordsInScene: number, wordsInChapter: number, wordsInNovel: number }

@Component({
	selector: 'app-footer-bar',
	templateUrl: './footer-bar.component.html',
	styleUrls: ['./footer-bar.component.less']
})
export class FooterBarComponent implements OnInit {

	private wordCount: WordCount = {
		wordsInScene: 11,
		wordsInChapter: 22,
		wordsInNovel: 42,
	}

	constructor(
		private readonly novelProvider: NovelProjectProviderService,
		private readonly novelTextChangeService: NovelTextChangeService,
		private readonly chapterSwitcherService: ChapterSwitcherService,
	) { }

	ngOnInit() {
		const novel: Novel = this.novelProvider.getNovel();
		const chapter: Chapter = novel.chapters[this.chapterSwitcherService.currentChapter];
		const scene: Scene = chapter.scenes[this.chapterSwitcherService.currentScene];

		// update on text change
		this.novelTextChangeService.subscribe((currentSceneText) => {
			this.wordCount = {
				wordsInScene: currentSceneText.split(' ').length,
				wordsInChapter: FooterBarComponent.countWordsOfChapter(chapter), // TODO
				wordsInNovel: FooterBarComponent.countWordsOfNovel(novel), // TODO
			}
		});

		// update on chapter switch
	}

	private static countWordsOfScene(scene: Scene) {
		return scene.text.split(' ').length;
	}

	private static sumReducer(previous: number, current: number) { return previous + current }

	private static countWordsOfChapter(chapter: Chapter) {
		return chapter.scenes.map((scene: Scene) => this.countWordsOfScene(scene)).reduce(FooterBarComponent.sumReducer);
	}

	private static countWordsOfNovel(novel: Novel) {
		return novel.chapters.map((chapter: Chapter) => this.countWordsOfChapter(chapter)).reduce(FooterBarComponent.sumReducer);
	}

}
