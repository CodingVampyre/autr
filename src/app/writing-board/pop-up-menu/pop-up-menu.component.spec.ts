import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpMenuComponent } from './pop-up-menu.component';

describe('PopUpMenuComponent', () => {
  let component: PopUpMenuComponent;
  let fixture: ComponentFixture<PopUpMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
