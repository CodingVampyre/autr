import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneWorldBuilderComponent } from './scene-world-builder.component';

describe('SceneWorldBuilderComponent', () => {
  let component: SceneWorldBuilderComponent;
  let fixture: ComponentFixture<SceneWorldBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneWorldBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneWorldBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
