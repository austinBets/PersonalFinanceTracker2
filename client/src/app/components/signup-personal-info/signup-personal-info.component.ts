import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-personal-info',
  standalone: true,
  templateUrl: './signup-personal-info.component.html',
  styleUrl: './signup-personal-info.component.css'
})
export class SignupPersonalInfoComponent {
  constructor(private router: Router) { }

  //method to handle step two click
  navigateToPayment(): void {
    this.router.navigate(['register/step2']);
  }
}
