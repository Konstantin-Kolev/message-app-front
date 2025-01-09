import { Component } from '@angular/core';
import { ChatWindowComponent } from "../chat-window/chat-window.component";
import { ChannelListComponent } from "../channel-list/channel-list.component";
import { UserStateService } from '../../services/user-state.service';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "../../side-bar/side-bar.component";
import { LoginFormComponent } from "../authentication/login-form/login-form.component";
import { ChannelType } from '../../models/channel.model';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [ChatWindowComponent, ChannelListComponent, CommonModule, SideBarComponent, LoginFormComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {

  constructor(public userStateService: UserStateService) {
  }

  public selectedChannel: ChannelType | null = null;

  public handleChannelSelect(element: ChannelType) {
    this.selectedChannel = { ...element };
  }
}
