import { Component, Input, OnInit } from '@angular/core';
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

	/** contents */
	public contents: IEntityCategory[];

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
			console.log('changing');
			this.onClickChangeCategory(this.contents[0].category);
		}

	}

}

export interface IEntityCategory { category: ITag; entity: IKeyValueEntity[]; }
