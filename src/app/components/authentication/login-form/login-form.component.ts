import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserStateService } from '../../../services/user-state.service';
import { UserApiService } from '../../../services/user-api.service';
import { UserType } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css', '../styles.css']
})
export class LoginFormComponent {

  constructor(private userStateService: UserStateService,
    private userApiService: UserApiService,
    private router: Router) { }

  login = {
    email: '',
    password: ''
  }
  user: UserType | undefined = undefined;

  loginFailed: boolean = false;

  @Output()
  public onSuccessfulLogin = new EventEmitter();

  onSubmit(): void {
    this.user = this.userApiService.login(this.login.email, this.login.password);
    if (this.user) {
      this.userStateService.setUser(this.user);
      this.onSuccessfulLogin.emit();
      this.router.navigateByUrl('');
    } else {
      this.loginFailed = true;
    }
  }
}
