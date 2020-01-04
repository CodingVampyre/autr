import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { IImageTag } from '../data-models/image-tag.interface';
import { ITag } from '../data-models/tag.interface';
import { IEntityCategory } from '../components/world-building/entity-details/entity-details.component';

@Injectable({
	providedIn: 'root',
})
export class WorldBuilderService {

	/** contains all characters */
	private characters: ICharacter[] = [];

	constructor(
		public databaseService: DatabaseService,
	) { }

	/**
	 * list all characters
	 * @return a list if Image Tags containing ids of all characters
	 */
	public listCharacters(): IImageTag[] {
		return this.characters.map((character: ICharacter) => {
			return {
				id: character.id,
				text: character.name,
				imgUrl: character.imgUrl,
			};
		});
	}

	/**
	 * lists all places
	 * @return a list of tags
	 */
	public listPlaces(): ITag[] {
		return [];
	}

	/**
	 * lists all objects
	 * @return a list of objects
	 */
	public listObjects(): ITag[] {
		return [];
	}

	/**
	 * creates a character and returns it's unqiue ID
	 * @param character the character to create
	 * @return the character id
	 */
	public createCharacter(character: ICharacter): void {
		this.characters.push(character);
	}

	/**
	 *
	 * @param characterId
	 */
	public retrieveCharacter(characterId: string): ICharacter {
		for (const character of this.characters) {
			if (character.id === characterId) { return character; }
		}
	}
}

// FIXME needs own file
/** used for characters */
interface ICharacter {

	/** uuid */
	id: string;

	/** full name of your character */
	name: string;

	/** url to an image describing how the character looks */
	imgUrl: string;

	/***/
	data: IEntityCategory[];
}
