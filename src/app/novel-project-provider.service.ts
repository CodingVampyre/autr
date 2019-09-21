import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NovelProjectProviderService {
  constructor() {}
}

/** novel containing all metadata */
export class Novel {
  /** working title or final title of your novel */
  public name: string = "UNTITLED NOVEL";

  public chapters: Chapter[] = [];
}

/** One chapter of your novel */
export class Chapter {

  /** name of your chapter */
  public name: string = "UNTITLED CHAPTER";

  /** a list of scenes which compose your chapter */
  public scenes: Scene[] = [];
}

/** A Scene of your chapter */
export class Scene {

  /** scene name */
  public name: string = "UNTITLED SCENE";

  /** all paragraphs */
  public paragraphs: string[] = [];
}
