import {Component, EventEmitter, OnInit} from '@angular/core';
import {NotificationService} from "../services/notification.service";
import {v1 as UUID} from 'uuid';

export interface INotification {
	id: string;
	text: string;
}

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {

	private notifications: INotification[] = [];

	constructor(
		private readonly notificationService: NotificationService,
	) { }

	async ngOnInit() {
		this.notificationService.newNotificationEmitter.subscribe(text => {
			this.displayNotification(text);
		});
	}

	private displayNotification(text: string): void {
		const id: string = UUID();
		this.notifications.push({ text, id });
		setTimeout(() => {
			// remove said notification
			for (let i=0; i<this.notifications.length; i++) {
				if (this.notifications[i].id === id) {
					this.notifications.splice(i, 1);
				}
			}
		}, 2000);
	}

}
