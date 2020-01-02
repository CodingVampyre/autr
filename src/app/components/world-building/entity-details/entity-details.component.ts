import { Component, Input } from '@angular/core';
import { ITag } from '../../../data-models/tag.interface';
import { IKeyValueEntity } from '../../common/entity-descriptor/entity-descriptor.component';

@Component({
	selector: 'app-entity-details',
	templateUrl: './entity-details.component.html',
	styleUrls: ['./entity-details.component.less'],
})
export class EntityDetailsComponent {

	/** used to select categories */
	@Input() public categories: ITag[];

	/** contents */
	@Input() public contents: IKeyValueEntity[];

	/** used as title */
	@Input() public title: string = 'Untitled Entity';

	/**
	 *
	 * @param category
	 * @todo take an object containing multiple arrays to let categories switch dynamically
	 */
	public onClickChangeCategory(category: ITag): void {
		console.log(category);
	}

}
