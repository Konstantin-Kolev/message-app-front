import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChannelListComponent } from "./channel-list/channel-list.component";
import { ChatWindowComponent } from "./chat-window/chat-window.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { UserStateService } from './services/user-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChannelListComponent, ChatWindowComponent, SideBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

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
