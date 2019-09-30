import { TestBed } from '@angular/core/testing';

import { NovelProjectProviderService } from './novel-project-provider.service';

describe('NovelProjectProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NovelProjectProviderService = TestBed.get(NovelProjectProviderService);
    expect(service).toBeTruthy();
  });
});
