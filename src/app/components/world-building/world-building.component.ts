import { Component, OnInit } from '@angular/core';
import { WorldBuilderService } from '../../services/world-builder.service';
import { IEntityCategory } from './entity-details/entity-details.component';

@Component({
	selector: 'app-world-building',
	templateUrl: './world-building.component.html',
	styleUrls: ['./world-building.component.less'],
})
export class WorldBuildingComponent {

	public contentToEdit: IEntityCategory[] = [
		{
			category: { id: 'hello', text: 'hello' }, entity: [
				{ name: 'hello', value: 'world' },
			],
		},
	];

	constructor(
		public worldBuilderService: WorldBuilderService,
	) { }

	public onClickCreateCharacter() {
		this.worldBuilderService.createCharacter({
			name: 'New Character',
			imgUrl: 'http://nightmare.mit.edu/static/faces/4a58b263dff079c4c6f23a0ad8bba719.png',
			data: [
				{ category: { id: 'appearance', text: 'appearance' }, entity: [] },
			],
		});
	}

}
