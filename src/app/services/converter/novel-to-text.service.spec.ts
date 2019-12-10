import { TestBed } from '@angular/core/testing';

import { NovelToTextService } from './novel-to-text.service';

describe('NovelToTextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NovelToTextService = TestBed.get(NovelToTextService);
    expect(service).toBeTruthy();
  });
});
