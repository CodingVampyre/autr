import {Scene} from './scene.class';

/** One chapter of your novel */
export class Chapter {
    /** name of your chapter */
    public name: string = "new chapter";
  
    /** a list of scenes which compose your chapter */
    public scenes: Scene[] = [];
  }