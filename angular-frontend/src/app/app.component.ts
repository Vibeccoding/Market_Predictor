import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="!isLoggedIn">
      <app-login (loginSuccess)="onLogin($event)"></app-login>
    </div>
    
    <div *ngIf="isLoggedIn">
      <mat-toolbar color="primary">
        <span>Market Predictor Dashboard</span>
        <span class="spacer"></span>
        <span>Welcome, {{user}}</span>
        <button mat-button (click)="logout()">Logout</button>
      </mat-toolbar>
      
      <div class="container">
        <mat-tab-group [(selectedIndex)]="activeTab">
          <mat-tab label="Dashboard Overview">
            <app-dashboard [data]="dashboardData"></app-dashboard>
          </mat-tab>
          <mat-tab label="Insurance Claims Detail">
            <app-insurance-claims></app-insurance-claims>
          </mat-tab>
          <mat-tab label="Insurance Market">
            <app-news-section category="insurance"></app-news-section>
          </mat-tab>
          <mat-tab label="Loan Claims">
            <app-news-section category="loan_claims"></app-news-section>
          </mat-tab>
          <mat-tab label="Preclosure Market">
            <app-news-section category="preclosure"></app-news-section>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    .container { padding: 20px; }
  `]
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  user = '';
  activeTab = 0;
  dashboardData: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDashboardData();
  }

  onLogin(username: string) {
    this.isLoggedIn = true;
    this.user = username;
  }

  logout() {
    this.isLoggedIn = false;
    this.user = '';
    this.activeTab = 0;
  }

  fetchDashboardData() {
    this.http.get('http://localhost:5000/api/dashboard').subscribe(
      (data: any) => this.dashboardData = data,
      error => console.error('Error fetching dashboard data:', error)
    );
  }
}