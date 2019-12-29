import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-scene-world-builder',
	templateUrl: './scene-world-builder.component.html',
	styleUrls: ['./scene-world-builder.component.less'],
})
export class SceneWorldBuilderComponent {

	constructor(
		public router: Router,
		public route: ActivatedRoute,
	) { }

	public async onClickSwitchToWorldBuilder() {
		const novelId = this.route.snapshot.paramMap.get('novelId');
		await this.router.navigate(['world-building', novelId]);
	}

}
