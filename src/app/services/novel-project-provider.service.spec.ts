import { TestBed } from '@angular/core/testing';

import { NovelProviderService } from './novel-provider.service';

describe('NovelProjectProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NovelProviderService = TestBed.get(NovelProviderService);
    expect(service).toBeTruthy();
  });
});
