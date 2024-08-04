import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SignupPersonalInfoComponent } from './components/signup-personal-info/signup-personal-info.component';
import { SignupPaymentInfoComponent } from './components/signup-payment-info/signup-payment-info.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent, children: [
        { path: '', redirectTo: 'step1', pathMatch: 'full' },
        {path: 'step1', component: SignupPersonalInfoComponent},
        {path: 'step2', component: SignupPaymentInfoComponent}
    ]},
];
