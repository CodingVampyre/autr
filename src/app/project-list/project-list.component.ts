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

  novels: string[] = [
    "My First Novel", 
    "Something stolen from Steven King",
    "A Crown for the King",
  ];

  ngOnInit() { }

  onClickLoadNovel(event, novelName: string) {
    console.log("Will load up", novelName);
  }

  onClickCreateNewNovel(newNovelName: string) {
    this.novels.unshift(newNovelName);
  }
}
