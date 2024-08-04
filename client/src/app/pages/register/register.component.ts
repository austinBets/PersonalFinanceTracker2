import { Component } from '@angular/core';
import { SignupPaymentInfoComponent } from '../../components/signup-payment-info/signup-payment-info.component';
import { SignupPersonalInfoComponent } from '../../components/signup-personal-info/signup-personal-info.component';
import { AppComponent } from "../../app.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SignupPaymentInfoComponent, SignupPersonalInfoComponent, AppComponent,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
