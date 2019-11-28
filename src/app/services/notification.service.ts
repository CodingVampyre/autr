import { Injectable } from '@angular/core';
import { EventEmitter } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class NotificationService extends EventEmitter<string> {
	public newNotificationEmitter = new EventEmitter<string>();

	constructor() { super(); }
}
