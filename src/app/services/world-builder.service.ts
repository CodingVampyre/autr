import { Injectable } from '@angular/core';
import { Nanograph } from 'nanograph';
import { DatabaseService } from './database.service';
import { IImageTag } from '../data-models/image-tag.interface';
import { ITag } from '../data-models/tag.interface';
// tslint:disable-next-line:no-submodule-imports
import { Vertex } from 'nanograph/build/graph/vertex.class';
import { IEntityCategory } from '../components/world-building/entity-details/entity-details.component';

@Injectable({
	providedIn: 'root',
})
export class WorldBuilderService {

	/** contains all metadata */
	private graph: Nanograph = new Nanograph();

	constructor(
		public databaseService: DatabaseService,
	) { }

	/**
	 * list all characters
	 * @return a list if Image Tags containing ids of all characters
	 */
	public listCharacters(): IImageTag[] {
		const characterList = this.graph.findVertices('CHARACTER').getAll() as Vertex[];
		return characterList.map((character: Vertex) => {
			return {
				id: character._id,
				text: character.properties.name,
				imgUrl: character.properties.imgUrl,
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
	public createCharacter(character: ICharacter): string {
		const { _id: characterId } = this.graph.createVertex('CHARACTER', character);
		return characterId;
	}

	/**
	 *
	 * @param characterId
	 */
	public retrieveCharacter(characterId: string): Vertex {
		return this.graph.findVertices('CHARACTER', characterId).getFirst();
	}
}

// FIXME needs own file
/** used for characters */
interface ICharacter {
	/** full name of your character */
	name: string;

	/** url to an image describing how the character looks */
	imgUrl: string;

	/***/
	data: IEntityCategory[];
}
