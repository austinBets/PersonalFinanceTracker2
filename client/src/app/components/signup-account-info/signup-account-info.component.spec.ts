import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAccountInfoComponent } from './signup-account-info.component';

describe('SignupAccountInfoComponent', () => {
  let component: SignupAccountInfoComponent;
  let fixture: ComponentFixture<SignupAccountInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupAccountInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
