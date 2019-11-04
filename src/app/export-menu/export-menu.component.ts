import { Component, OnInit } from '@angular/core';
// const { dialog } = require('electron').remote;


@Component({
	selector: 'app-export-menu',
	templateUrl: './export-menu.component.html',
	styleUrls: ['./export-menu.component.less']
})
export class ExportMenuComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	onClickExportNovelAsJSON() {
		//const path: string[] = dialog.showOpenDialogSync({
		//	title: "Export JSON to...",
		//});
	}

}
