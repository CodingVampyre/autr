import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NovelProjectProviderService } from '../services/novel-project-provider.service';

@Component({
	selector: 'app-writing-board',
	templateUrl: './writing-board.component.html',
	styleUrls: ['./writing-board.component.less']
})
export class WritingBoardComponent implements OnInit {

	constructor(
		private novelProvider: NovelProjectProviderService,
		private router: Router,
	) { }

	ngOnInit() {
		if (this.novelProvider.getNovel() == null) {
			this.router.navigate(['projects']);
		}
	}

}
