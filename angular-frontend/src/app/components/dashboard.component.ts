import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <h2>Market Overview Dashboard</h2>
      
      <div class="cards-container">
        <mat-card *ngFor="let item of getDataEntries()" class="market-card">
          <mat-card-header>
            <mat-card-title>{{formatCategory(item.key)}}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p><strong>Status:</strong> {{item.value.market_status}}</p>
            <p><strong>Trend:</strong> {{item.value.trend}}</p>
            
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>Latest News</mat-panel-title>
              </mat-expansion-panel-header>
              <div *ngFor="let news of item.value.news">
                <h4>{{news.title}}</h4>
                <p>{{news.summary}}</p>
                <small>{{news.date}}</small>
              </div>
            </mat-expansion-panel>
            
            <mat-expansion-panel *ngIf="item.value.ai_insights">
              <mat-expansion-panel-header>
                <mat-panel-title>AI Market Insights</mat-panel-title>
              </mat-expansion-panel-header>
              <pre>{{item.value.ai_insights}}</pre>
            </mat-expansion-panel>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { padding: 20px; }
    .cards-container { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
      gap: 20px; 
      margin-top: 20px; 
    }
    .market-card { height: fit-content; }
    pre { white-space: pre-wrap; font-size: 12px; }
  `]
})
export class DashboardComponent {
  @Input() data: any = {};

  getDataEntries() {
    return Object.entries(this.data).filter(([key]) => key !== 'insurance_claims_details');
  }

  formatCategory(category: string): string {
    return category.replace('_', ' ').toUpperCase();
  }
}