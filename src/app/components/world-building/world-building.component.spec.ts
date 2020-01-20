import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldBuildingComponent } from './world-building.component';

describe('WorldBuildingComponent', () => {
  let component: WorldBuildingComponent;
  let fixture: ComponentFixture<WorldBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
