import { TestBed, inject } from '@angular/core/testing';

import { GetItemListService } from './get-item-list.service';

describe('GetItemListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetItemListService]
    });
  });

  it('should be created', inject([GetItemListService], (service: GetItemListService) => {
    expect(service).toBeTruthy();
  }));
});
