import { Component } from '@angular/core';
import { WorldBuilderService } from '../../services/world-builder.service';
import { IEntityCategory } from './entity-details/entity-details.component';
import { v1 as UUID } from 'uuid';

@Component({
	selector: 'app-world-building',
	templateUrl: './world-building.component.html',
	styleUrls: ['./world-building.component.less'],
})
export class WorldBuildingComponent {

	public contentToEdit: IEntityCategory[];

	/***/
	private currentlySelectedCharacterName: string;

	/***/
	private currentlySelectedCharacterId: string;

	constructor(
		public worldBuilderService: WorldBuilderService,
	) { }

	/** creates a new character and sets thee focus on editing that one */
	public onClickCreateCharacter(newCharacterName: string): void {
		const newCharacterId = UUID();

		this.worldBuilderService.createCharacter({
			id: newCharacterId,
			name: newCharacterName,
			imgUrl: 'http://nightmare.mit.edu/static/faces/4a58b263dff079c4c6f23a0ad8bba719.png',
			data: [
				{ category: { id: 'appearance', text: 'appearance' }, entity: [] },
				{ category: { id: 'mindset', text: 'mindset' }, entity: [] },
				{ category: { id: 'story', text: 'story' }, entity: [] },
			],
		});

		this.activateCharacter(newCharacterId);
	}

	public onLoadListCharacters() {
		return this.worldBuilderService.listCharacters();
	}

	/**
	 *
	 * @param characterId
	 */
	public activateCharacter(characterId: string) {
		const character = this.worldBuilderService.retrieveCharacter(characterId);
		if (character !== undefined) {
			this.contentToEdit = character.data;
			this.currentlySelectedCharacterName = character.name;
			this.currentlySelectedCharacterId = character.id;
		} else {
			console.error('character not found');
		}
	}

}
