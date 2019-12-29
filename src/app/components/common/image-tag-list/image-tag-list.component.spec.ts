import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTagListComponent } from './image-tag-list.component';

describe('ImageTagListComponent', () => {
  let component: ImageTagListComponent;
  let fixture: ComponentFixture<ImageTagListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageTagListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
