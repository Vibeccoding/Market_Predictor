import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Market Predictor Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Username</mat-label>
              <input matInput [(ngModel)]="username" name="username" required>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput type="password" [(ngModel)]="password" name="password" required>
            </mat-form-field>
            
            <div *ngIf="error" class="error">{{error}}</div>
            
            <button mat-raised-button color="primary" type="submit" class="full-width">
              Login
            </button>
          </form>
          <p class="demo-text">Demo: admin / password</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .login-card {
      width: 400px;
      padding: 20px;
    }
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    .error {
      color: red;
      margin-bottom: 15px;
    }
    .demo-text {
      text-align: center;
      color: #666;
      margin-top: 15px;
    }
  `]
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<string>();
  
  username = '';
  password = '';
  error = '';

  onSubmit() {
    if (this.username === 'admin' && this.password === 'password') {
      this.loginSuccess.emit(this.username);
    } else {
      this.error = 'Invalid credentials. Use admin/password';
    }
  }
}