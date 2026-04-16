import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProvider } from './add-provider';

describe('AddProvider', () => {
  let component: AddProvider;
  let fixture: ComponentFixture<AddProvider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProvider],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProvider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
