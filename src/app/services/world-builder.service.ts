import { Injectable } from '@angular/core';
import { Nanograph } from 'nanograph';
import { DatabaseService } from './database.service';
import { IImageTag } from '../data-models/image-tag.interface';
import { ITag } from '../data-models/tag.interface';

@Injectable({
	providedIn: 'root',
})
export class WorldBuilderService {

	/** contains all metadata */
	private graph: Nanograph;

	constructor(
		public databaseService: DatabaseService,
	) { }

	/**
	 * list all characters
	 * @return a list if Image Tags containing ids of all characters
	 */
	public listCharacters(): IImageTag[] {
		return [];
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
}
