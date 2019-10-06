import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { RouterModule } from '@angular/router';
import { WritingBoardComponent } from './writing-board/writing-board.component';
import { WritingPanelComponent } from './writing-board/writing-panel/writing-panel.component';
import { ChapterListComponent } from './writing-board/chapter-list/chapter-list.component';
import { AdderMenuComponent } from './writing-board/chapter-list/adder-menu/adder-menu.component';
import { ChapterTreeComponent } from './writing-board/chapter-list/chapter-tree/chapter-tree.component';
import { ContenteditableModelDirective } from './directives/contenteditable-model.directive';
import { PopUpMenuComponent } from './writing-board/pop-up-menu/pop-up-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    WritingBoardComponent,
    WritingPanelComponent,
    ChapterListComponent,
    AdderMenuComponent,
    ChapterTreeComponent,
    ContenteditableModelDirective,
    PopUpMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: 'projects', component: ProjectListComponent},
      {path: 'writing-board', component: WritingBoardComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PopUpMenuComponent],
})
export class AppModule { }
