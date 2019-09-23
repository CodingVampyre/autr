import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NovelProjectProviderService {

  /**
   * returns a static novel
   */
  public getDummyNovel() {
    const n = new Novel();
    const c1 = new Chapter();
    const c2 = new Chapter();
    const c3 = new Chapter();

    const s1 = new Scene();
    const s2 = new Scene();
    const s3 = new Scene();

    c1.scenes = [s1, s2]
    c2.scenes = [s3];
    n.chapters = [c1, c2, c3, c1, c1, c1, c1, c1, c1];

    return n;
  }

  constructor() {}
}

/** novel containing all metadata */
export class Novel {
  /** working title or final title of your novel */
  public name: string = "UNTITLED NOVEL";

  /** chapters */
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
