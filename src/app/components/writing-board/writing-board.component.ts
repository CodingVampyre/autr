import { Component, OnInit } from '@angular/core';
import { NovelProviderService } from '../../services/novel-provider.service';
import { DatabaseService } from '../../services/database.service';
import { ChapterSwitcherService } from '../../services/chapter-switcher.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-writing-board',
	templateUrl: './writing-board.component.html',
	styleUrls: ['./writing-board.component.less'],
})
export class WritingBoardComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private novelProvider: NovelProviderService,
		private databaseService: DatabaseService,
		private chapterSwitcherService: ChapterSwitcherService,
	) { }

	public async ngOnInit() {
		// retrieve novelId
		const novelId = this.route.snapshot.paramMap.get('novelId');

		// load novel
		await this.loadNovel(novelId);
	}

	public async loadNovel(novelId) {
		// fetch novel from the database
		const dbNovelEntry = await this.databaseService.describeNovel(novelId);

		// set the novel as main novel to work with
		this.novelProvider.setNovel(dbNovelEntry);
		this.novelProvider.novelId = novelId;

		// set chapter and scene
		this.chapterSwitcherService.switchToChapterEmitter.emit({
			toChapter: this.novelProvider.getNovel().cursor.currentChapter,
			toScene: this.novelProvider.getNovel().cursor.currentScene,
		});
	}
}
