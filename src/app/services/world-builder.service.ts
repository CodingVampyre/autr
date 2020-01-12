import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { IEntityCategory } from '../components/world-building/entity-details/entity-details.component';
import { NovelProviderService } from './novel-provider.service';

@Injectable({
	providedIn: 'root',
})
export class WorldBuilderService {

	/** contains all characters */
	public characters: ICharacter[] = [];

	/** contains all places */
	public places: IPlace[] = [];

	/** contains all objects */
	public objects: IObject[] = [];

	constructor(
		public databaseService: DatabaseService,
		public novelProviderService: NovelProviderService,
	) { }

	/**
	 *
	 * @param place
	 */
	public createPlace(place: IPlace): void {
		this.places.push(place);
	}

	/**
	 *
	 * @param placeId
	 */
	public retrievePlace(placeId: string): IPlace {
		for (const place of this.places) {
			if (place.id === placeId) { return place; }
		}
	}

	/**
	 *
	 * @param id
	 */
	public deletePlace(id: string): void {
		for (let index = 0; index < this.places.length; ++index) {
			if (this.places[index].id === id) { this.places.splice(index, 1); }
		}
	}

	/**
	 *
	 * @param object
	 */
	public createObject(object: IObject): void {
		this.objects.push(object);
	}

	/**
	 *
	 * @param objectId
	 */
	public retrieveObject(objectId: string): IObject {
		for (const object of this.objects) {
			if (object.id === objectId) { return object; }
		}
	}

	/**
	 *
	 * @param id
	 */
	public deleteObject(id: string): void {
		for (let index = 0; index < this.objects.length; ++index) {
			if (this.objects[index].id === id) { this.objects.splice(index, 1); }
		}
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

	/**
	 *
	 * @param id
	 */
	public deleteCharacter(id: string) {
		for (let index = 0; index < this.characters.length; ++index) {
			if (this.characters[index].id === id) { this.characters.splice(index, 1); }
		}
	}

	/**
	 *
	 */
	public async saveToDatabase() {
		await this.databaseService.storeNovelWorldBuilding(this.novelProviderService.novelId, {
			characters: this.characters,
			places: this.places,
			objects: this.objects,
		});
	}
}

// FIXME needs own file
/** used for characters */
export interface ICharacter {

	/** uuid */
	id: string;

	/** full name of your character */
	name: string;

	/** url to an image describing how the character looks */
	imgUrl: string;

	/***/
	data: IEntityCategory[];
}

export interface IPlace {

	/***/
	id: string;

	/***/
	name: string;

	/***/
	imgUrl: string;

	/***/
	data: IEntityCategory[];
}

export interface IObject {

	/***/
	id: string;

	/***/
	name: string;

	/***/
	imgUrl: string;

	/***/
	data: IEntityCategory[];
}
