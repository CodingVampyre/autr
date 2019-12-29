import { Injectable } from '@angular/core';
import { Nanograph } from 'nanograph';
import { DatabaseService } from './database.service';

@Injectable({
	providedIn: 'root',
})
export class WorldBuilderService {

	/** contains all metadata */
	private graph: Nanograph;

	constructor(
		public databaseService: DatabaseService,
	) { }
}
