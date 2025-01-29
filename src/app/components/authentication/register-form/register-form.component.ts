import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserApiService } from '../../../services/user-api.service';
import { UserStateService } from '../../../services/user-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['../styles.css']
})
export class RegisterFormComponent {

  constructor(private userApiService: UserApiService,
    private userStateService: UserStateService,
    private router: Router) { }

  register = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  }

  passwordMatchError = false;
  registerError = false;
  registerErrorMessage = '';

  onSubmit() {
    if (this.register.password !== this.register.passwordConfirm) {
      this.passwordMatchError = true;
      return;
    }

    this.userApiService.createUser({
      email: this.register.email,
      password: this.register.password,
      username: this.register.username
    }).subscribe({
      next: (response: any) => {
        this.userStateService.setUser(response.data);
        this.router.navigateByUrl('');
      },
      error: (err) => {
        this.registerError = true;
        this.registerErrorMessage = err.error.message;
      }
    })
  }
}
