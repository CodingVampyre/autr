import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterTreeComponent } from './chapter-tree.component';

describe('ChapterTreeComponent', () => {
  let component: ChapterTreeComponent;
  let fixture: ComponentFixture<ChapterTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
