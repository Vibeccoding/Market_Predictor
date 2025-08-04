import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news-section',
  template: `
    <div class="news-section">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{getCategoryTitle()}}</mat-card-title>
          <div class="header-actions">
            <button mat-stroked-button (click)="fetchNews()" [disabled]="loading">
              Refresh News
            </button>
            <button *ngIf="category === 'insurance'" mat-raised-button color="primary" 
                    (click)="fetchRecommendations()" [disabled]="loadingRec">
              Get AI Recommendations
            </button>
          </div>
        </mat-card-header>
        
        <mat-card-content>
          <div *ngIf="loading">Loading AI-powered news...</div>
          
          <mat-list *ngIf="!loading">
            <mat-list-item *ngFor="let item of news; let last = last">
              <div class="news-item">
                <div class="news-header">
                  <h3>{{item.title}}</h3>
                  <mat-chip *ngIf="item.impact" [color]="getImpactColor(item.impact)">
                    {{item.impact}} Impact
                  </mat-chip>
                </div>
                <p>{{item.summary}}</p>
                <div *ngIf="item.recommendation" class="recommendation">
                  <strong>AI Recommendation:</strong> {{item.recommendation}}
                </div>
                <small>{{item.date}}</small>
              </div>
              <mat-divider *ngIf="!last"></mat-divider>
            </mat-list-item>
          </mat-list>
          
          <div *ngIf="category === 'insurance' && recommendations" class="recommendations">
            <h3>AI-Generated Strategic Recommendations</h3>
            <div *ngIf="loadingRec">Generating recommendations...</div>
            <pre *ngIf="!loadingRec">{{recommendations}}</pre>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .news-section { padding: 20px; }
    .header-actions { display: flex; gap: 10px; }
    .news-item { width: 100%; }
    .news-header { display: flex; justify-content: space-between; align-items: center; }
    .recommendation { 
      background: #e3f2fd; 
      padding: 10px; 
      border-radius: 4px; 
      margin: 10px 0; 
    }
    .recommendations { 
      margin-top: 20px; 
      padding: 15px; 
      background: #f5f5f5; 
      border-radius: 4px; 
    }
    pre { white-space: pre-wrap; }
  `]
})
export class NewsSectionComponent implements OnInit {
  @Input() category: string = '';
  
  news: any[] = [];
  recommendations = '';
  loading = true;
  loadingRec = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchNews();
    if (this.category === 'insurance') {
      this.fetchRecommendations();
    }
  }

  fetchNews() {
    this.loading = true;
    this.http.get(`http://localhost:5000/api/news/${this.category}`).subscribe(
      (data: any) => {
        this.news = data.news || [];
        this.loading = false;
      },
      error => {
        console.error('Error fetching news:', error);
        this.loading = false;
      }
    );
  }

  fetchRecommendations() {
    this.loadingRec = true;
    this.http.get('http://localhost:5000/api/insurance-recommendations').subscribe(
      (data: any) => {
        this.recommendations = data.recommendations || '';
        this.loadingRec = false;
      },
      error => {
        console.error('Error fetching recommendations:', error);
        this.loadingRec = false;
      }
    );
  }

  getCategoryTitle(): string {
    const titles: any = {
      insurance: 'Insurance Market News',
      loan_claims: 'Loan Claims News',
      preclosure: 'Preclosure Market News'
    };
    return titles[this.category] || 'Market News';
  }

  getImpactColor(impact: string): string {
    switch (impact) {
      case 'High': return 'warn';
      case 'Medium': return 'accent';
      case 'Low': return 'primary';
      default: return '';
    }
  }
}