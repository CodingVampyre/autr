import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdderMenuComponent } from './adder-menu.component';

describe('AdderMenuComponent', () => {
  let component: AdderMenuComponent;
  let fixture: ComponentFixture<AdderMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdderMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
