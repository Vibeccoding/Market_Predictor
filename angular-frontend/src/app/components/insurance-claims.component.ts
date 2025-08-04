import { Component } from '@angular/core';

@Component({
  selector: 'app-insurance-claims',
  template: `
    <div class="insurance-claims">
      <h2>Insurance Claims Management - Strategic Recommendations</h2>
      
      <div class="recommendations-grid">
        <mat-card *ngFor="let rec of recommendations" class="recommendation-card">
          <mat-card-header>
            <mat-card-title>{{rec.title}}</mat-card-title>
            <mat-chip [color]="getPriorityColor(rec.priority)">
              {{rec.priority}} Priority
            </mat-chip>
          </mat-card-header>
          <mat-card-content>
            <p>{{rec.description}}</p>
            <h4>Key Benefits:</h4>
            <ul>
              <li *ngFor="let benefit of rec.benefits">{{benefit}}</li>
            </ul>
            <div class="roi">
              <strong>Expected ROI:</strong> 
              <mat-chip color="primary">{{rec.roi}}</mat-chip>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
      
      <mat-card class="benefits-card">
        <mat-card-header>
          <mat-card-title>Expected Market Benefits & Impact</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="benefits-grid">
            <div *ngFor="let benefit of marketBenefits" class="benefit-item">
              <h3>{{benefit.impact}}</h3>
              <h4>{{benefit.category}}</h4>
              <p>{{benefit.description}}</p>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .insurance-claims { padding: 20px; }
    .recommendations-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); 
      gap: 20px; 
      margin: 20px 0; 
    }
    .recommendation-card { height: fit-content; }
    .roi { margin-top: 15px; }
    .benefits-card { margin-top: 30px; }
    .benefits-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
      gap: 20px; 
    }
    .benefit-item { 
      text-align: center; 
      padding: 15px; 
      border: 1px solid #ddd; 
      border-radius: 8px; 
    }
  `]
})
export class InsuranceClaimsComponent {
  recommendations = [
    {
      title: 'Implement AI-Powered Claims Processing',
      description: 'Deploy machine learning algorithms for automated claim validation and processing',
      benefits: ['Reduce processing time by 60%', 'Cut operational costs by $2.5M annually', 'Improve accuracy to 98.5%'],
      priority: 'High',
      roi: '340%'
    },
    {
      title: 'Digital-First Customer Experience',
      description: 'Launch mobile app with photo claim submission and real-time tracking',
      benefits: ['Increase customer satisfaction by 35%', 'Reduce call center volume by 45%', 'Speed up claim submission by 70%'],
      priority: 'High',
      roi: '280%'
    },
    {
      title: 'Predictive Fraud Detection System',
      description: 'Integrate advanced analytics to identify fraudulent claims before processing',
      benefits: ['Prevent $4.2M in fraudulent payouts', 'Reduce investigation time by 50%', 'Improve detection rate to 92%'],
      priority: 'Medium',
      roi: '450%'
    }
  ];

  marketBenefits = [
    { category: 'Cost Reduction', impact: '$8.5M annually', description: 'Through automation and fraud prevention' },
    { category: 'Customer Experience', impact: '4.8/5 satisfaction', description: 'Digital-first approach with instant updates' },
    { category: 'Processing Speed', impact: '85% faster', description: 'AI-powered validation and automated workflows' },
    { category: 'Fraud Prevention', impact: '$4.2M saved', description: 'Advanced analytics and pattern recognition' }
  ];

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'High': return 'warn';
      case 'Medium': return 'accent';
      case 'Low': return 'primary';
      default: return '';
    }
  }
}