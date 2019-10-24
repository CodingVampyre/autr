/**
 * this code is licensed under the MIT-License
 * <https://opensource.org/licenses/MIT>
 * AUTR - 2019
 * 
 * Created by CodingVampyre <tobiaskavse@hotmail.de>
 */

import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import {Novel} from '../data-models/novel.interface';

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
   * stores a novel into the database
   * @param key {string} the key to store the database to
   * @param novel {Novel} the book to store
   * @returns {Promise<void>}
   */
  public async storeNovel(key: string, novel: Novel): Promise<void> {
    this.db.put({_id: 'novel:' + key, novel});
  }

  /**
   * fetches a single novel
   * @param key {string}
   * @returns {Promise<Novel | undefined>}
   */
  public async fetchNovel(key: string): Promise<Novel | undefined> {
    return await this.db.get(key);
  }

  public async storeTestData<T>(key: string, data: T) {
    await this.db.put({_id: key, data});
  }
  public async retrieveTestData(key: string) {
    return await this.db.get(key);
  }
}
