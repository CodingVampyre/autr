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

    const s1 = new Scene();
    const s2 = new Scene();
    const s3 = new Scene();

    c1.name = "A moon is rising";
    c2.name = "Something New everyday";
    s1.name = "Another Morning";
    s2.name = "The Box of Pandora";
    s1.text = `This is a multiline novel! 
    
    It is very neat!`;
    s2.text = `Another Scene was openend!`;

    c1.scenes = [s1, s2];
    c2.scenes = [s3];
    n.chapters = [c1, c2];

    this.novel = n;
  }

  public getNovel() {
    return this.novel;
  }

  /**
   * adds a chapter to the novel
   */
  public addChapter(chapterPosition: number) {
    if (
      chapterPosition > this.getNovel().chapters.length ||
      chapterPosition < 0
    )
      throw new Error("can't add chapter after end of novel");
    this.getNovel().chapters.splice(chapterPosition, 0, new Chapter());
    this.addScene(chapterPosition, 0);
  }

  /**
   * adds a scene to the novel
   */
  public addScene(chapterNr: number, scenePosition: number) {
    if (chapterNr < 0 || chapterNr >= this.getNovel().chapters.length)
      throw new Error("can't add scene to unknown chapter");

    this.getNovel().chapters[chapterNr].scenes.splice(
      scenePosition,
      0,
      new Scene()
    );
  }

  /**
   *
   */
  public moveChapter(chapterNr: number, newPosition: number) {
    // error prevention
    if (chapterNr < 0 || chapterNr > this.novel.chapters.length)
      throw new Error("chapterNr out of bounds");
    if (newPosition < 0) newPosition = 0;
    else if (newPosition > this.novel.chapters.length)
      newPosition = this.novel.chapters.length;

    // move chapter
    const chapterToMove: Chapter = this.novel.chapters[chapterNr];
    this.novel.chapters.splice(chapterNr, 1); // delete old
    if (newPosition > chapterNr)
      this.novel.chapters.splice(newPosition + 1, 0, chapterToMove);
    // insert after deleted point
    else this.novel.chapters.splice(newPosition, 0, chapterToMove); // insert new before deleted point
  }

  /**
   *
   */
  public moveScene(
    fromChapter: number,
    fromScene: number,
    toChapter: number,
    toScenePosition: number
  ) {
    const sceneToMove = this.novel.chapters[fromChapter].scenes[fromScene];
    this.novel.chapters[fromChapter].scenes.splice(fromScene, 1); // delete old
    if (fromChapter === toChapter) {
      // check if this chapter must be manipulated
      if (toScenePosition > fromScene)
        this.novel.chapters[toChapter].scenes.splice(toScenePosition + 1, 0, sceneToMove);
      else
        this.novel.chapters[toChapter].scenes.splice(toScenePosition, 0, sceneToMove);
    } else {
      // just insert without doubt
      this.novel.chapters[toChapter].scenes.splice(toScenePosition, 0, sceneToMove);
    }
  }

  /**
   * 
   */
  deleteChapter(chapterNr: number) {
    this.novel.chapters.splice(chapterNr, 1);
  }

  /**
   * 
   */
  renameChapter(chapterNr: number, newName: string) {
    this.novel.chapters[chapterNr].name = newName;
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
  public text: string = "";
}
