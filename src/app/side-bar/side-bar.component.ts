import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket, faPlus, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { UserStateService } from '../services/user-state.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'side-bar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  constructor(public userStateService: UserStateService) {
  }

  userIcon = faUser;
  addUserIcon = faUserPlus;
  plusIcon = faPlus;
  logoutIcon = faArrowRightFromBracket;

  public logoutClick() {
    this.userStateService.clearUser();
  }
}
