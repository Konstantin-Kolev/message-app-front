import { Component } from '@angular/core';
import { ChannelDropdownComponent } from "../channel-dropdown/channel-dropdown.component";

@Component({
  selector: '[app-channel-list]',
  standalone: true,
  imports: [ChannelDropdownComponent],
  templateUrl: './channel-list.component.html',
  styleUrl: './channel-list.component.css'
})
export class ChannelListComponent {

  public channelsHeader = 'Group chats';
  public channelList: string[] = ['some chat', 'super channel', 'talking abbout whatever'];
  public chatsHeader = 'Chats with friends';
  public chatsList: string[] = ['user2', 'user3', 'some_name_for_user'];
}
