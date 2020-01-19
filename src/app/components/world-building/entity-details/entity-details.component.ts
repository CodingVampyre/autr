import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITag } from '../../../data-models/tag.interface';
import { IKeyValueEntity } from '../../common/entity-descriptor/entity-descriptor.component';

@Component({
	selector: 'app-entity-details',
	templateUrl: './entity-details.component.html',
	styleUrls: ['./entity-details.component.less'],
})
export class EntityDetailsComponent {

	/** used as title */
	@Input() public title: string = 'Untitled Entity';

	/** fired when the delete button was pressed */
	@Output() public deleteButtonClick = new EventEmitter();

	/** contents */
	public contents: IEntityCategory[];

	/***/
	@Output() public onContentEdited = new EventEmitter();

	/** the category that currently is selected */
	private currentlySelectedCategory: ITag;

	/** the entities that currently can be edited */
	private currentlySelectedEntities: IKeyValueEntity[];

	/**
	 * @return a tag list of categories
	 */
	public listCategories(): ITag[] {
		return this.contents.map((content) => content.category);
	}

	/**
	 *
	 * @param category
	 */
	public onClickChangeCategory(category: ITag): void {
		if (this.contents === undefined) { return; }

		// set contents for details panel
		for (const entities of this.contents) {
			if (entities.category.id === category.id) {
				this.currentlySelectedCategory = category;
				this.currentlySelectedEntities = entities.entity;
				return;
			}
		}
	}

	/**
	 *
	 * @param contents
	 */
	public passContents(contents: IEntityCategory[]) {
		this.contents = contents;
		const category = this.contents[0].category;
		if (category !== undefined) {
			this.onClickChangeCategory(this.contents[0].category);
		}

	}

	public close() {
		this.contents = undefined;
	}
}

export interface IEntityCategory { category: ITag; entity: IKeyValueEntity[]; }
