import { Component, OnInit } from '@angular/core';
import { WorldBuilderService } from '../../services/world-builder.service';

@Component({
	selector: 'app-world-building',
	templateUrl: './world-building.component.html',
	styleUrls: ['./world-building.component.less'],
})
export class WorldBuildingComponent {

	constructor(
		public worldBuilderService: WorldBuilderService,
	) { }

}
