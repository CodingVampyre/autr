import { Injectable } from '@angular/core';
import {Novel} from '../../data-models/novel.interface';

@Injectable({
	providedIn: 'root'
})
export class PdfRendererService {

	constructor() { }

	public static createPdf(novel: Novel) {
		console.log('sending to backend');
	}
}
