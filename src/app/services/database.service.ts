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

PouchDB.plugin(PouchDbFind);

/** manages persistent storage with level */
@Injectable({
	providedIn: 'root'
})
export class DatabaseService {

	/** database instance */
	private db = new PouchDB('autr');

	/** default constructor */
	constructor() { }

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
	 * @param key {string} the key to store the database to
	 * @param novel {Novel} the book to store
	 * @returns {Promise<void>}
	 */
	public async storeNovel(key: string, novel: Novel): Promise<void> {
		await this.db.put({
			_id: 'novel:' + key,
			type: 'novel',
			novel: novel,
			name: novel.name,
			createdAt: Date.now(),
		});
	}

	/**
	 * fetches a single novel
	 * @param key {string}
	 * @returns {Promise<Novel | undefined>}
	 */
	public async describeNovel(key: string): Promise<Novel | undefined> {
		return await this.db.get(key);
	}

	/**
	 * 
	 */
	public async listNovels(): Promise<any> {
		const result: PouchDB.Find.FindResponse<{}> = await this.db.find({
			selector: {
				_id: {$exists: true},
			},
			fields: ['_id', 'type', 'name', 'createdAt'],
		});
		return result as any;
	}
}
