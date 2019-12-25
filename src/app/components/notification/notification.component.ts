import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { v1 as UUID } from 'uuid';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface INotification {
	id: string;
	text: string;
}

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.less'],
	animations: [
		trigger('fadeAnimation', [

			// normal state while existing
			state('in', style({ opacity: 1 })),

			// on creation of an instance
			transition(':enter', [
				style({ opacity: 0, transform: 'translateX(300px)' }),
				animate('200ms ease'),
			]),

			// on leave
			transition(':leave', animate('200ms ease', style({
				opacity: 0,
				transform: 'translateX(300px)',
			}))),
		]),
	],
})
export class NotificationComponent implements OnInit {

	private notifications: INotification[] = [];

	constructor(
		private readonly notificationService: NotificationService,
	) { }

	public ngOnInit() {
		this.notificationService.newNotificationEmitter.subscribe((text) => {
			this.displayNotification(text);
		});
	}

	private displayNotification(text: string): void {
		const id: string = UUID();
		const notificationDisplayTime = 2000;
		this.notifications.push({ text, id });
		setTimeout(() => {
			// remove said notification
			for (let i = 0; i < this.notifications.length; i++) {
				if (this.notifications[i].id === id) {
					this.notifications.splice(i, 1);
				}
			}
		}, notificationDisplayTime);
	}

}
