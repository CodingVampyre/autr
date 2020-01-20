import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITag } from '../../../data-models/tag.interface';

/** a list of tags */
@Component({
	selector: 'app-tag-list',
	templateUrl: './tag-list.component.html',
	styleUrls: ['./tag-list.component.less'],
})
export class TagListComponent {

	/** a list of tags */
	@Input() public tagList: ITag[];

	/** if provided, this tag should be marked as active */
	@Input() public highlightedTag: ITag;

	/** fired when a tag is clicked */
	@Output() public onClickTag = new EventEmitter();

}
