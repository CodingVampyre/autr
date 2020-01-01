import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityDescriptorComponent } from './entity-descriptor.component';

describe('EntityDescriptorComponent', () => {
  let component: EntityDescriptorComponent;
  let fixture: ComponentFixture<EntityDescriptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityDescriptorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDescriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
