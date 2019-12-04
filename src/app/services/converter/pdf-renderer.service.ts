import { Injectable } from '@angular/core';
import {Novel} from '../../data-models/novel.interface';
import jsPDF from 'jspdf';

@Injectable({
	providedIn: 'root'
})
export class PdfRendererService {

	constructor() { }

	public static createPdf(novel: Novel) {
		const doc = new jsPDF();

		doc.text('Lorem Ipsum Dolor Sit Amet', 10, 10);
		doc.save('novel.pdf');
	}
}
