import { Component, OnInit } from '@angular/core';
import { NovelProjectProviderService } from 'src/app/novel-project-provider.service';

@Component({
  selector: 'app-writing-panel',
  templateUrl: './writing-panel.component.html',
  styleUrls: ['./writing-panel.component.less']
})
export class WritingPanelComponent implements OnInit {

  constructor(
    private novelService: NovelProjectProviderService,
  ) { }

  private model: string = "this is my novel text";

  ngOnInit() {
  }

  onBlur() {
    console.log(this.model);
  }

  onInput() {
    console.log(this.model);
  }

}
