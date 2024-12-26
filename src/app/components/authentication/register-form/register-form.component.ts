import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user.model';
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

  username: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';
  user: User = {
    email: '',
    password: '',
    username: ''
  }

  onSubmit() {
    this.user = {
      email: this.email,
      password: this.password,
      username: this.username
    }
    this.user = this.userApiService.createUser(this.user);
    this.userStateService.setUser(this.user);

    this.router.navigateByUrl('');
  }


}
