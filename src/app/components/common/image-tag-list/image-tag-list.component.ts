import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IImageTag } from '../../../data-models/image-tag.interface';

/** used to render a list of tags containing an image */
@Component({
	selector: 'app-image-tag-list',
	templateUrl: './image-tag-list.component.html',
	styleUrls: ['./image-tag-list.component.less'],
})
export class ImageTagListComponent {

	/** a list of image tags */
	@Input() public imageTagList: IImageTag[];

	/** fired when a tag is clicked, emits tag data to component */
	@Output() public onClickTag = new EventEmitter();

	/***/
	private draggedTag;

	public onDragStart(event: DragEvent, imageTagId: string) {
		const timeToWaitMs = 10;

		// setTimeout prevents a bug that fires the dragleave immediately after starting to drag.
		// may be fixed in future versions
		setTimeout(() => {
			this.draggedTag = imageTagId;
		}, timeToWaitMs);
	}

	public onDragEnd(event: DragEvent, id: string) {
		this.draggedTag = undefined;
	}
}
