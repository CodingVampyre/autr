import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITag } from '../../../data-models/tag.interface';

@Component({
	selector: 'app-tag-list',
	templateUrl: './tag-list.component.html',
	styleUrls: ['./tag-list.component.less'],
})
export class TagListComponent {

	@Input() public tagList: ITag[];

	@Output() public onClickTag = new EventEmitter();

}
