import { Component, OnInit, ViewChild } from '@angular/core';
import { WorldBuilderService } from '../../services/world-builder.service';
import { EntityDetailsComponent } from './entity-details/entity-details.component';
import { v1 as UUID } from 'uuid';
import { IImageTag } from '../../data-models/image-tag.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-world-building',
	templateUrl: './world-building.component.html',
	styleUrls: ['./world-building.component.less'],
})
export class WorldBuildingComponent implements OnInit{

	public characters: IImageTag[] = [];

	@ViewChild('entityDetailsComponent', { static: true, read: EntityDetailsComponent })
	public entityDetailsComponent: EntityDetailsComponent;

	/***/
	private currentlySelectedCharacterName: string;

	/***/
	private currentlySelectedCharacterId: string;

	constructor(
		public worldBuilderService: WorldBuilderService,
		public router: Router,
		public route: ActivatedRoute,
	) { }

	public ngOnInit() {
		this.updateCharacterList();
	}

	/** recreates the tag list to fetch characters from world builder service */
	public updateCharacterList() {
		this.characters = this.worldBuilderService.characters.map((character) => {
			return { id: character.id, text: character.name, imgUrl: character.imgUrl };
		});
	}

	/** creates a new character and sets thee focus on editing that one */
	public onClickCreateCharacter(newCharacterName: string): void {
		const newCharacterId = UUID();
		const categoryTemplate = [
			{ category: { id: 'appearance', text: 'appearance' }, entity: [] },
			{ category: { id: 'mindset', text: 'mindset' }, entity: [] },
			{ category: { id: 'story', text: 'story' }, entity: [] },
		];

		this.worldBuilderService.createCharacter({
			id: newCharacterId,
			name: newCharacterName,
			imgUrl: 'http://nightmare.mit.edu/static/faces/4a58b263dff079c4c6f23a0ad8bba719.png',
			data: categoryTemplate,
		});

		this.updateCharacterList();
	}

	/**
	 *
	 * @param characterId
	 */
	public activateCharacter(characterId: string) {
		const character = this.worldBuilderService.retrieveCharacter(characterId);
		if (character !== undefined) {

			// set metadata
			this.currentlySelectedCharacterName = character.name;
			this.currentlySelectedCharacterId = character.id;
			this.entityDetailsComponent.passContents(character.data);

		}
	}

	public deleteCharacter() {
		const id = this.currentlySelectedCharacterId;
		this.currentlySelectedCharacterId = undefined;
		this.currentlySelectedCharacterName = undefined;
		// close details panel
		this.entityDetailsComponent.close();
		// delete out of list
		this.worldBuilderService.deleteCharacter(id);
		// update list
		this.updateCharacterList();
	}

	public async navigateToWritingPanel() {
		const routerId = this.route.snapshot.paramMap.get('novelId');
		await this.router.navigate(['writing-board', routerId]);
	}
}
