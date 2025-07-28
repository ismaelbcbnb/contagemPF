import { TestBed } from '@angular/core/testing';

import { ContagensService } from './Services/contagens.service';

describe('ContagensService', () => {
  let service: ContagensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContagensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
