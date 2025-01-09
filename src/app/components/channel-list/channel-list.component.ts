import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
export class ChannelListComponent implements OnInit {

  public channelsHeader = 'Group chats';
  public channelList: ChannelType[] = [];
  public chatsHeader = 'Chats with friends';
  public chatsList: ChannelType[] = [];

  constructor(public userStateService: UserStateService, public channelsApiService: ChannelsApiService) { }

  ngOnInit(): void {
    var allChannels: ChannelType[];
    var currentUser = this.userStateService.getCurrentUser()();
    if (currentUser) {
      allChannels = this.channelsApiService.getChannelsForUser(currentUser);
      this.channelList = allChannels.filter((channel) => channel.channelType === 'group');
      this.chatsList = allChannels.filter((channel) => channel.channelType === 'friend');
    }
  }

  @Output()
  public onChannelSelect = new EventEmitter();
}
