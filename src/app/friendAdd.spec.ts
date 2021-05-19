
import { TestBed } from '@angular/core/testing';

import { Friend } from './friend';

describe('AddFriendService', () => {
  let service: Friend;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Friend);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
