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


  renameChapter(chapterNewName: string) {
    console.log('renaming to', chapterNewName);
    this.novelProvider.renameChapter(this.chapterNr, chapterNewName);
  }

  constructor(
    private novelProvider: NovelProjectProviderService
  ) { }

  ngOnInit() {
  }

  onClickDeleteChapter(chapterNr: number) {
    this.novelProvider.deleteChapter(chapterNr);
    this.destroyMe();
  }

  destroyMe() {
    this.destroyEmitter.emit();
  }

}
