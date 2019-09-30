import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NovelProjectProviderService {
  private novel: Novel;

  constructor() {
    // TODO this is dummy code. It must be removed in upcoming updates!
    const n = new Novel();
    const c1 = new Chapter();
    const c2 = new Chapter();
    const c3 = new Chapter();

    const s1 = new Scene();
    const s2 = new Scene();
    const s3 = new Scene();

    s1.name = "Another Morning";
    s2.name = "The Box of Pandora";
    s1.text = `This is a multiline novel! 
    
    It is very neat!`;
    s2.text = `Another Scene was openend!`;

    c1.scenes = [s1, s2];
    c2.scenes = [s3];
    n.chapters = [c1, c2, c3];

    this.novel = n;
  }

  public getNovel() {
    return this.novel;
  }

  /**
   * adds a chapter to the novel
   */
  public addChapter(chapterPosition: number): Chapter[] {
    if (chapterPosition > this.getNovel().chapters.length || chapterPosition < 0) throw new Error('can\'t add chapter after end of novel');
    return this.getNovel().chapters.splice(chapterPosition, 0, new Chapter());
  }

  /**
   * adds a scene to the novel
   */
  public addScene(chapterNr: number, scenePosition: number) {
    if (chapterNr < 0 || chapterNr >= this.getNovel().chapters.length) throw new Error('can\'t add scene to unknown chapter');

    this.getNovel().chapters[chapterNr].scenes.splice(scenePosition, 0, new Scene());
  }
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
  public text: string;
}
