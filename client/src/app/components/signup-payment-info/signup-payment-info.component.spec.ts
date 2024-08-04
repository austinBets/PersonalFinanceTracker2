import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPaymentInfoComponent } from './signup-payment-info.component';

describe('SignupPaymentInfoComponent', () => {
  let component: SignupPaymentInfoComponent;
  let fixture: ComponentFixture<SignupPaymentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupPaymentInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupPaymentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
