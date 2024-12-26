import { Component } from '@angular/core';
import { ChatWindowComponent } from "../chat-window/chat-window.component";
import { ChannelListComponent } from "../channel-list/channel-list.component";
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserStateService } from '../../services/user-state.service';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "../../side-bar/side-bar.component";
import { RegisterFormComponent } from "../authentication/register-form/register-form.component";

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [ChatWindowComponent, ChannelListComponent, CommonModule, SideBarComponent, RegisterFormComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {

  user$: Observable<User | null>;
  constructor(private userStateService: UserStateService) {
    this.user$ = this.userStateService.user$;
  }

  public loginClick() {
    this.userStateService.setUser({
      id: 1,
      username: 'user1',
      email: 'some@mail.com'
    });
  }
}
