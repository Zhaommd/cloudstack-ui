import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared';
import { INotificationService } from '../shared/services/notification.service';
import { SecurityGroupService } from '../shared/services/security-group.service';


@Component({
  selector: 'cs-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {
  private username: string;
  private password: string;

  constructor(
    private auth: AuthService,
    @Inject('INotificationService') private notification: INotificationService,
    private router: Router,
    private securityGroupService: SecurityGroupService
  ) {
    this.username = '';
    this.password = '';
  }

  public onSubmit(): void {
    this.login(this.username, this.password);
  }

  private login(username: string, password: string): void {
    this.auth.login(username, password)
      .subscribe(() => {
        this.handleLogin();
      }, error => {
        this.handleError(error);
      });
  }

  private handleLogin(): void {
    this.securityGroupService.removeEmptyGroups();
    this.router.navigate(['']);
  }

  private handleError(error: string): void {
    this.notification.message(error);
  }
}
