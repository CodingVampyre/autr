import { TestBed } from '@angular/core/testing';

import { WorldBuilderService } from './world-builder.service';

describe('WorldBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorldBuilderService = TestBed.get(WorldBuilderService);
    expect(service).toBeTruthy();
  });
});
