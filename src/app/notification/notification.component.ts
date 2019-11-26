import {Component, EventEmitter, OnInit} from '@angular/core';
import {NotificationService} from "../services/notification.service";

export interface INotification {
	text: string;
}

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {

	private notifications: INotification[] = [
		{ text: 'This is just another test message. May be a few letters though!' },
		{ text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam' },
	];

	constructor(
		private readonly notificationService: NotificationService,
	) { }

	ngOnInit() {
		this.notificationService.newNotificationEmitter.subscribe(text => {
			this.notifications.push({ text });
		});
	}

}
