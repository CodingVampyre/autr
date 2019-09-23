import { Component, OnInit } from '@angular/core';
import { NovelProjectProviderService } from 'src/app/novel-project-provider.service';

@Component({
  selector: 'app-chapter-tree',
  templateUrl: './chapter-tree.component.html',
  styleUrls: ['./chapter-tree.component.less']
})
export class ChapterTreeComponent implements OnInit {

  constructor(private novelProvider: NovelProjectProviderService) { }

  ngOnInit() {
  }

}
