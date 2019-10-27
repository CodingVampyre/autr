/**
 * this code is licensed under the MIT-License
 * <https://opensource.org/licenses/MIT>
 * AUTR - 2019
 *
 * Created by CodingVampyre <tobiaskavse@hotmail.de>
 */

import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../services/database.service";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.less"]
})
export class ProjectListComponent implements OnInit {
	constructor(private readonly db: DatabaseService) {}

	novels: any[] = [];

	async ngOnInit() {
		// create index if it doesn't exist
		await this.db.createNovelIndex();

		// fetch novels
		const novelList = await this.db.listNovels();
		this.novels = novelList.docs;
	}

	onClickLoadNovel(event, novelName: string) {
		console.log("Will load up", novelName);
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
		const novels = await this.db.listNovels();
		this.novels = novels.docs;
	}
}
