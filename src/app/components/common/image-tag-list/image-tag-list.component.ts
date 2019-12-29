import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IImageTag } from '../../../data-models/image-tag.interface';

@Component({
	selector: 'app-image-tag-list',
	templateUrl: './image-tag-list.component.html',
	styleUrls: ['./image-tag-list.component.less'],
})
export class ImageTagListComponent {

	@Input() public imageTagList: IImageTag[];

	@Output() public onClickTag = new EventEmitter();

}
