import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRightFromBracket, faPlus, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'side-bar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  logoutIcon = faArrowRightFromBracket;
  plusIcon = faPlus;
  addUserIcon = faUserPlus;
}
