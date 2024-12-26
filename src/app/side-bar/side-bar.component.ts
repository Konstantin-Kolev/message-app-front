import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket, faPlus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { UserStateService } from '../services/user-state.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'side-bar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  public user$: Observable<User|null>;
  constructor(private userStateService: UserStateService) {
    this.user$ = this.userStateService.user$;
   }

  logoutIcon = faArrowRightFromBracket;
  plusIcon = faPlus;
  addUserIcon = faUserPlus;

  public logoutClick() {
    this.userStateService.clearUser();
  }
}
