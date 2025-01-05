import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserStateService } from '../../../services/user-state.service';
import { UserApiService } from '../../../services/user-api.service';
import { User } from '../../../models/user.model';
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

  email: string = '';
  password: string = '';
  user: User | undefined = undefined;

  onSubmit() {
    this.user = this.userApiService.login(this.email, this.password);
    if (this.user) {
      this.userStateService.setUser(this.user);
      this.router.navigateByUrl('');
    }
  }
}
