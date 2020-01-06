import { Directive, Input, Output, ElementRef, EventEmitter, SimpleChanges } from '@angular/core';

/** allows to edit text in a div and work with the edited text */
@Directive({
	selector: '[contenteditableModel]',
	host: {
		'(keyup)': 'onKeyup()',
	},
})
export class ContenteditableModelDirective {

	/** the model that is edited, comes from outside */
	@Input('contenteditableModel') public model: string;

	/** gets called when the user types something */
	@Output('contenteditableModelChange') public update = new EventEmitter();

	/** last view model used */
	private lastViewModel: string;

	/**
	 * default constructor
	 * @param elRef allows to work with the contents of the element this directive is assigned to
	 */
	constructor(
		private elRef: ElementRef,
	) { }

	/**
	 * called when the content of the element changes
	 * @param changes the changes that are made
	 */
	public ngOnChanges(changes: SimpleChanges) {

		// if new data are typed
		if (changes.model && changes.model.currentValue !== this.lastViewModel) {

			// store last model
			this.lastViewModel = this.model;

			// refresh displayed text
			this.refreshView();
		}
	}

	/** called when a key is lifted */
	public onKeyup() {

		// get typed text
		const value = this.elRef.nativeElement.innerText;

		// store written text
		this.lastViewModel = value;

		// notify about changes to outside
		this.update.emit(value);
	}

	/** rewrite the text of the element */
	private refreshView() {
		this.elRef.nativeElement.innerText = this.model;
	}

}
