import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderModal } from './provider-modal';

describe('ProviderModal', () => {
  let component: ProviderModal;
  let fixture: ComponentFixture<ProviderModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
