import { Component, HostListener } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent {
	title = 'autr';

	// prevents ctrl+s to download the document!
	@HostListener('document:keydown.control.s', ['$event'])
    async onKeyDown(event) {
        event.preventDefault();
	}
}
