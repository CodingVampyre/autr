import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { RouterModule } from '@angular/router';
import { WritingBoardComponent } from './components/writing-board/writing-board.component';
import { WritingPanelComponent } from './components/writing-board/writing-panel/writing-panel.component';
import { ChapterListComponent } from './components/writing-board/chapter-list/chapter-list.component';
import { AdderMenuComponent } from './components/writing-board/chapter-list/adder-menu/adder-menu.component';
import { ChapterTreeComponent } from './components/writing-board/chapter-list/chapter-tree/chapter-tree.component';
import { ContenteditableModelDirective } from './directives/contenteditable-model.directive';
import { PopUpMenuComponent } from './components/writing-board/pop-up-menu/pop-up-menu.component';
import { FooterBarComponent } from './components/writing-board/footer-bar/footer-bar.component';
import { ExportMenuComponent } from './components/export-menu/export-menu.component';
import { NotificationComponent } from './components/common/notification/notification.component';
import { WritingHeaderBarComponent } from './components/writing-board/writing-header-bar/writing-header-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagListComponent } from './components/common/tag-list/tag-list.component';
import { ImageTagListComponent } from './components/common/image-tag-list/image-tag-list.component';
import { WorldBuildingComponent } from './components/world-building/world-building.component';
import { SceneWorldBuilderComponent } from './components/writing-board/scene-world-builder/scene-world-builder.component';
import { EntityDescriptorComponent } from './components/common/entity-descriptor/entity-descriptor.component';
import { EntityDetailsComponent } from './components/world-building/entity-details/entity-details.component';
import { TextButtonComponent } from './components/common/text-button/text-button.component';

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
		FooterBarComponent,
		ExportMenuComponent,
		NotificationComponent,
		WritingHeaderBarComponent,
		TagListComponent,
		ImageTagListComponent,
		WorldBuildingComponent,
		SceneWorldBuilderComponent,
		EntityDescriptorComponent,
		EntityDetailsComponent,
		TextButtonComponent,
 	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		RouterModule.forRoot([
			{ path: 'projects', component: ProjectListComponent },
			{ path: 'export/:novelId', component: ExportMenuComponent },
			{ path: 'writing-board/:novelId', component: WritingBoardComponent },
			{ path: 'world-building/:novelId', component: WorldBuildingComponent },
		]),
	],
	providers: [],
	bootstrap: [AppComponent],
	entryComponents: [PopUpMenuComponent],
})
export class AppModule { }
