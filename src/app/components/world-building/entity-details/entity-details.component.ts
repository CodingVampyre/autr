import { Component, Input, OnInit } from '@angular/core';
import { ITag } from '../../../data-models/tag.interface';
import { IKeyValueEntity } from '../../common/entity-descriptor/entity-descriptor.component';

@Component({
	selector: 'app-entity-details',
	templateUrl: './entity-details.component.html',
	styleUrls: ['./entity-details.component.less'],
})
export class EntityDetailsComponent implements OnInit {

	/** contents */
	@Input() public contents: IEntityCategory[];

	/** used as title */
	@Input() public title: string = 'Untitled Entity';

	/** the category that currently is selected */
	private currentlySelectedCategory: ITag;

	/** the entities that currently can be edited */
	private currentlySelectedEntities: IKeyValueEntity[];

	public ngOnInit() {
		if (this.currentlySelectedCategory !== undefined) {
			this.currentlySelectedCategory = this.contents[0].category;
			this.currentlySelectedEntities = this.contents[0].entity;
		}
	}

	public listCategories(): ITag[] {
		return this.contents.map((content) => content.category);
	}

	/**
	 *
	 * @param category
	 * @todo take an object containing multiple arrays to let categories switch dynamically
	 */
	public onClickChangeCategory(category: ITag): void {
		this.currentlySelectedCategory = category;
		for (const entities of this.contents) {
			if (entities.category.id === category.id) { this.currentlySelectedEntities = entities.entity; }
		}
	}

}

export interface IEntityCategory { category: ITag; entity: IKeyValueEntity[]; }
