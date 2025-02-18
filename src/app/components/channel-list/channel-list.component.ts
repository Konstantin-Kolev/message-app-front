import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChannelDropdownComponent } from "../channel-dropdown/channel-dropdown.component";
import { UserStateService } from '../../services/user-state.service';
import { ChannelType } from '../../models/channel.model';

@Component({
  selector: '[app-channel-list]',
  standalone: true,
  imports: [ChannelDropdownComponent],
  templateUrl: './channel-list.component.html'
})
export class ChannelListComponent {

  public channelsHeader = 'Group chats';
  public chatsHeader = 'Chats with friends';
  @Input()
  public channelList: ChannelType[] = [];
  @Input()
  public chatsList: ChannelType[] = [];

  constructor(public userStateService: UserStateService) { }

  @Output()
  public onChannelSelect = new EventEmitter();
}
