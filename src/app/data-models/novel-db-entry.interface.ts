import { Novel } from './novel.interface';

/***/
export interface INovelDbEntry {
	_id: string;
	novel: Novel;
	type: 'novel';
	name: string;
	createdAt: number;
	modifiedAt: number;
}
