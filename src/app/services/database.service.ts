/**
 * this code is licensed under the MIT-License
 * <https://opensource.org/licenses/MIT>
 * AUTR - 2019
 *
 * Created by CodingVampyre <tobiaskavse@hotmail.de>
 */

import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDbFind from 'pouchdb-find';
import { Novel } from '../data-models/novel.interface';
import { v1 as UUID } from 'uuid';
import { INovelDbEntry } from '../data-models/novel-db-entry.interface';
import { ICharacter, IObject, IPlace } from './world-builder.service';

PouchDB.plugin(PouchDbFind);

/** manages persistent storage with level */
@Injectable({
	providedIn: 'root',
})
export class DatabaseService {

	/** database instance */
	private db = new PouchDB('autr');

	/**
	 *
	 */
	public async createNovelIndex() {
		await this.db.createIndex({
			index: {
				name: 'novelListIndex',
				fields: ['_id', 'type', 'name', 'createdAt'],
			},
		});
	}

	/**
	 * stores a novel into the database
	 * @param novel the book to store
	 * @returns the key of the created novel
	 */
	public async storeNovel(novel: Novel): Promise<string> {
		const key: string = UUID();
		await this.db.put<INovelDbEntry>({
			_id: key,
			type: 'novel',
			novel,
			name: novel.name,
			createdAt: Date.now(),
			modifiedAt: Date.now(),
		});
		return key;
	}

	/**
	 * saves a novel over an already existing one.
	 */
	public async updateNovel(novelId: string, novel: Novel): Promise<void> {
		const oldNovelDbEntry: INovelDbEntry = await this.db.get<INovelDbEntry>(novelId);
		oldNovelDbEntry.novel = novel;
		oldNovelDbEntry.modifiedAt = Date.now();
		await this.db.put(oldNovelDbEntry);
	}

	/**
	 * fetches a single novel
	 * @param novelId the primary key of the novel
	 * @returns a novel, if one was loaded and fround
	 */
	public async describeNovel(novelId: string): Promise<Novel | undefined> {
		return ((await this.db.get(novelId)) as any).novel as Novel;
	}

	/**
	 *
	 */
	public async listNovels(): Promise<any> {
		const result: PouchDB.Find.FindResponse<{ }> = await this.db.find({
			selector: {
				_id: { $exists: true },
			},
			fields: ['_id', 'type', 'name', 'createdAt'],
		});
		return result.docs as any;
	}

	public async deleteNovel(id: string): Promise<void> {
		const novel = await this.db.get(id);
		if (novel !== undefined) {
			await this.db.remove(novel);
		}
	}

	/**
	 * TODO test
	 * @param novelId
	 * @param worldBuilding
	 */
	public async storeNovelWorldBuilding(
		novelId: string,
		worldBuilding: { characters: ICharacter[]; places: IPlace[]; objects: IObject[] },
		) {

		// look if an entry exists or create one
		const key = novelId + ':world-building';

		try {
			const worldBuildingData = await this.db.get(key) as any;
			// update if entry exists
			if (worldBuildingData._id === key) {
				worldBuildingData.worldBuilding = worldBuilding;
				worldBuildingData.modifiedAt = Date.now();
				return this.db.put(worldBuildingData);
			}
		} catch (error) {
			console.error(error.message);

			if (error.message === 'missing') {
				// create an entry if none exists
				console.log('crate new entry');
				return this.db.put({
					_id: novelId + ':world-building',
					type: 'world-building-data',
					worldBuilding,
					createdAt: Date.now(),
					modifiedAt: Date.now(),
				});
			}

		}
	}

	/**
	 * retrieve worldBuilding
	 * @param novelId
	 */
	public async describeWorldBuilding(novelId: string) {
		try {
			return ((await this.db.get(novelId + ':world-building')) as any).worldBuilding;
		} catch (error) {
			console.error('describeWorldBuilding: ', error.message);
		}

	}
}
