import { TestBed } from '@angular/core/testing';

import { FormFacade } from './form-facade';

describe('FormFacade', () => {
  let service: FormFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
