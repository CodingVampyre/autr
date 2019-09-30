import { TestBed } from '@angular/core/testing';

import { ChapterSwitcherService } from './chapter-switcher.service';

describe('ChapterSwitcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChapterSwitcherService = TestBed.get(ChapterSwitcherService);
    expect(service).toBeTruthy();
  });
});
