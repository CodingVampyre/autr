import { Component, EventEmitter, Input, Output } from '@angular/core';

/** */
@Component({
	selector: 'app-text-button',
	templateUrl: './text-button.component.html',
	styleUrls: ['./text-button.component.less'],
})
export class TextButtonComponent {

	/**  */
	@Output() public onExecute = new EventEmitter();

	@Input() public label = 'text';
	@Input() public buttonText = 'go';

	/**
	 * creates the text if the filed is not empty
	 * @param value text to be emitted
	 */
	public createText(value: string) {
		if (value === '') { return; }
		this.onExecute.emit(value);
	}
}
