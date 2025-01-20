import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChannelDropdownComponent } from "../channel-dropdown/channel-dropdown.component";
import { UserStateService } from '../../services/user-state.service';
import { ChannelsApiService } from '../../services/channels-api.service';
import { ChannelType } from '../../models/channel.model';

@Component({
  selector: '[app-channel-list]',
  standalone: true,
  imports: [ChannelDropdownComponent],
  templateUrl: './channel-list.component.html',
  styleUrl: './channel-list.component.css'
})
export class ChannelListComponent {

  public channelsHeader = 'Group chats';
  public chatsHeader = 'Chats with friends';
  @Input()
  public channelList: ChannelType[] = [];
  @Input()
  public chatsList: ChannelType[] = [];

  constructor(public userStateService: UserStateService, public channelsApiService: ChannelsApiService) { }

  @Output()
  public onChannelSelect = new EventEmitter();
}
