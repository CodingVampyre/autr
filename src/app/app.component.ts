import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {

	public title = 'autr';

	constructor(
		private readonly router: Router,
	) { }

	public async ngOnInit() {
		// await this.router.navigate(['/projects']);
	}

	// prevents ctrl+s to download the document!
	@HostListener('document:keydown.control.s', ['$event'])
	public onKeyDown(event) {
		event.preventDefault();
	}
}
