/**
 * this code is licensed under the MIT-License
 * <https://opensource.org/licenses/MIT>
 * AUTR - 2019
 * 
 * Created by CodingVampyre <tobiaskavse@hotmail.de>
 */

/** a novel is a book that includes fiction or non fiction text */
export interface Novel {
    /** title or working title of the novel */
    name: string;

    /** a novel is composed of chapters */
    chapters: Chapter[];
}

/** a chapter is part of a novel. The novel is composed of chapters */
export interface Chapter {
    /** every chapter has a name */
    name: string;

    /** and is composed of scenes */
    scenes: Scene[];
}

/** c chapter is composed of scenes. A scene is an in itself closed situation in the novel */
export interface Scene {
    /** every scene has a name */
    name: string;

    /** novel text */
    text: string;
}