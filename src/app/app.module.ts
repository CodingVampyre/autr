import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { RouterModule } from '@angular/router';
import { WritingBoardComponent } from './writing-board/writing-board.component';
import { WritingPanelComponent } from './writing-board/writing-panel/writing-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    WritingBoardComponent,
    WritingPanelComponent,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
