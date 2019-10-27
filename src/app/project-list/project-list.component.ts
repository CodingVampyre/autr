/**
 * this code is licensed under the MIT-License
 * <https://opensource.org/licenses/MIT>
 * AUTR - 2019
 *
 * Created by CodingVampyre <tobiaskavse@hotmail.de>
 */

import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../services/database.service";
import { NovelProjectProviderService } from '../services/novel-project-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.less"]
})
export class ProjectListComponent implements OnInit {
	constructor(
		private readonly db: DatabaseService,
		private readonly novelProvider: NovelProjectProviderService,
		private router: Router,
	) {}

	novels: any[] = [];

	async ngOnInit() {
		// create index if it doesn't exist
		await this.db.createNovelIndex();

		// fetch novels
		this.novels = await this.db.listNovels();;
	}

	async onClickLoadNovel(event, novelId: string) {
		const dbNovelEntry = await this.db.describeNovel(novelId);
		this.novelProvider.setNovel(dbNovelEntry);
		this.router.navigate(['/writing-board']);
	}

	async onClickCreateNewNovel(newNovelName: string) {
		// store a new novel
		await this.db.storeNovel({
			name: newNovelName,
			chapters: [{
				name: 'chapter 1',
				scenes: [{
					name: 'first scene',
					text: 'write your scene here!'
				}],
			}],
		});

		// refresh list
		this.novels = await this.db.listNovels();
	}

	async onClickDeleteNovel(event, novelId) {
		await this.db.deleteNovel(novelId);
		this.novels = await this.db.listNovels();
	}
}
