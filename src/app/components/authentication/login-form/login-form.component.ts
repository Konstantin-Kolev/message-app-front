import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserStateService } from '../../../services/user-state.service';
import { UserApiService } from '../../../services/user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['../styles.css']
})
export class LoginFormComponent {

  constructor(private userStateService: UserStateService,
    private userApiService: UserApiService,
    private router: Router) { }

  login = {
    email: '',
    password: ''
  }

  loginFailed: boolean = false;

  @Output()
  public onSuccessfulLogin = new EventEmitter();

  onSubmit(): void {
    this.userApiService.login(this.login.email, this.login.password).subscribe({
      next: (response: any) => {
        if (response.code === 200) {
          this.userStateService.setUser(response.data);
          this.onSuccessfulLogin.emit();
          this.router.navigateByUrl('');
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.loginFailed = true;
        }
      }
    });
  }
}
