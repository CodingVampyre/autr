import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NovelProviderService } from '../../services/novel-provider.service';
import { NotificationService } from '../../services/notification.service';

@Component({
	selector: 'app-writing-board',
	templateUrl: './writing-board.component.html',
	styleUrls: ['./writing-board.component.less'],
})
export class WritingBoardComponent implements OnInit {

	constructor(
		private novelProvider: NovelProviderService,
		private router: Router,
		private notificationService: NotificationService,
	) { }

	public async ngOnInit() {
		// return back if no novel is loaded
		if (this.novelProvider.getNovel() === undefined) {
			this.notificationService.newNotificationEmitter.emit('no novel was loaded. Return to project list...');
			await this.router.navigate(['projects']);
		}
	}
}
