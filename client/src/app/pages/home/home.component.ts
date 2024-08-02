import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { PricingComponent } from '../../components/pricing/pricing.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, PricingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}
