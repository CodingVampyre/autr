import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingPanelComponent } from './writing-panel.component';

describe('WritingPanelComponent', () => {
  let component: WritingPanelComponent;
  let fixture: ComponentFixture<WritingPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritingPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
