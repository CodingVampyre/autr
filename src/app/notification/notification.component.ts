import { Component, OnInit } from '@angular/core';

export interface INotification {
	text: string;
}

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit {

	private notification: Notification[] = [];

	constructor() { }

	ngOnInit() {
	}

}
