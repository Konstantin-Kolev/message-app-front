import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserType } from '../../../models/user.model';
import { UserApiService } from '../../../services/user-api.service';
import { UserStateService } from '../../../services/user-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css', '../styles.css']
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

  onSubmit() {
    if (this.register.password !== this.register.passwordConfirm) {
      this.passwordMatchError = true;
      return;
    }
    const user = this.userApiService.createUser({
      email: this.register.email,
      password: this.register.password,
      username: this.register.username
    });
    this.userStateService.setUser(user);

    this.router.navigateByUrl('');
  }


}
