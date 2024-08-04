import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPersonalInfoComponent } from './signup-personal-info.component';

describe('SignupPersonalInfoComponent', () => {
  let component: SignupPersonalInfoComponent;
  let fixture: ComponentFixture<SignupPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupPersonalInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
