import { TestBed } from '@angular/core/testing';

import { PdfRendererService } from './pdf-renderer.service';

describe('PdfRendererService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdfRendererService = TestBed.get(PdfRendererService);
    expect(service).toBeTruthy();
  });
});
