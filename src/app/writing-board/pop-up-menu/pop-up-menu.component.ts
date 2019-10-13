import { Component, OnInit, Input, Output } from '@angular/core';
import { NovelProjectProviderService } from 'src/app/services/novel-project-provider.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up-menu',
  templateUrl: './pop-up-menu.component.html',
  styleUrls: ['./pop-up-menu.component.less']
})
export class PopUpMenuComponent implements OnInit {

  @Input() chapterNr: number;
  @Input() sceneNr: number;
  @Input() context: 'chapter' | 'scene';

  @Output() destroyEmitter: EventEmitter<void> = new EventEmitter();

  constructor(
    private novelProvider: NovelProjectProviderService
  ) { }

  renameChapter(chapterNewName: string) {
    this.novelProvider.renameChapter(this.chapterNr, chapterNewName);
  }

  renameScene(sceneNewName: string) {
    this.novelProvider.renameScene(this.chapterNr, this.sceneNr, sceneNewName);
  }

  ngOnInit() {
  }

  onClickDeleteChapter(chapterNr: number) {
    this.novelProvider.deleteChapter(chapterNr);
    this.destroyMe();
  }

  onClickDeleteScene(chapterNr: number, sceneNr: number) {
    this.novelProvider.deleteScene(chapterNr, sceneNr);
    this.destroyMe();
  }

  destroyMe() {
    this.destroyEmitter.emit();
  }

}
