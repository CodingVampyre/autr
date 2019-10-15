import {Chapter} from './chapter.class';

/** novel containing all metadata */
export class Novel {
    /** working title or final title of your novel */
    public name: string = "UNTITLED NOVEL";
  
    /** chapters */
    public chapters: Chapter[] = [];
  }