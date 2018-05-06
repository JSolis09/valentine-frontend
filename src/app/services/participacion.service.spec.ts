import { TestBed, inject } from '@angular/core/testing';

import { ParticipacionService } from './participacion.service';

describe('ParticipacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticipacionService]
    });
  });

  it('should be created', inject([ParticipacionService], (service: ParticipacionService) => {
    expect(service).toBeTruthy();
  }));
});
