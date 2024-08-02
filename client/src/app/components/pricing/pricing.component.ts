import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})

export class PricingComponent {
  pricingPlans = [
    {
      title: 'Basic',
      description: 'For people looking to keep track of their income and expenses',
      price: 'Free',
      features: [
        'expense tracker',
        'income'
      ]
    },
    {
      title: 'Premium',
      description: 'For people looking to control their entire financial situation',
      price: '$5/month',
      features: [
        'Expense tracker',
        'Income',
        'Investment Tracker',
        'Vehicle Evaluation',
        'Home Value'
      ]
    },
  ];
}
