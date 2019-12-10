import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class NovelTextChangeService extends EventEmitter<string> {
	constructor() {
		super();
	}
}
