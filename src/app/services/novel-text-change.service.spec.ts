import { TestBed } from '@angular/core/testing';

import { NovelTextChangeService } from './novel-text-change.service';

describe('NovelTextChangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NovelTextChangeService = TestBed.get(NovelTextChangeService);
    expect(service).toBeTruthy();
  });
});
