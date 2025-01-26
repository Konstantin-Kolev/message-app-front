import { Component, OnInit } from '@angular/core';
import { ChatWindowComponent } from "../chat-window/chat-window.component";
import { ChannelListComponent } from "../channel-list/channel-list.component";
import { UserStateService } from '../../services/user-state.service';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "../../side-bar/side-bar.component";
import { LoginFormComponent } from "../authentication/login-form/login-form.component";
import { ChannelType } from '../../models/channel.model';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ChannelsApiService } from '../../services/channels-api.service';
import { UserType } from '../../models/user.model';
import { UserApiService } from '../../services/user-api.service';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [ChatWindowComponent, ChannelListComponent, CommonModule, SideBarComponent, LoginFormComponent, FontAwesomeModule, FormsModule, FilterPipe],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent implements OnInit {

  constructor(public userStateService: UserStateService, private channelsApiService: ChannelsApiService, private userApiService: UserApiService) {
  }

  closeIcon = faXmark;

  newChannelName: string = '';
  userSearch: string = '';

  public selectedChannel: ChannelType | null = null;
  public channelList: ChannelType[] = [];
  public chatsList: ChannelType[] = [];
  public usersList: UserType[] = [];

  public isCreateChannelVisible = false;
  public isAddFriendVisible = false;

  ngOnInit(): void {
    this.loadChannels();
    this.loadUsersForFriends();
  }

  private loadChannels(): void {
    var allChannels: ChannelType[];
    var currentUser = this.userStateService.getCurrentUser()();
    if (currentUser) {
      allChannels = this.channelsApiService.getChannelsForUser(currentUser);
      this.channelList = allChannels.filter((channel) => channel.channelType === 'group');
      this.chatsList = allChannels.filter((channel) => channel.channelType === 'friend');
    }
  }

  private loadUsersForFriends(): void {
    const currentUser = this.userStateService.getCurrentUser()();
    if (currentUser) {
      this.usersList = this.userApiService.getUsersForFriends(currentUser);
    }
  }

  public handleLogin() {
    this.loadChannels();
    this.loadUsersForFriends();
  }

  public handleChannelDelete() {
    this.selectedChannel = null;
    this.loadChannels();
  }

  public handleChannelSelect(element: ChannelType) {
    this.selectedChannel = { ...element };
  }

  public toggleAddFriend() {
    this.isAddFriendVisible = !this.isAddFriendVisible;
    this.isCreateChannelVisible = false;
    this.userSearch = '';
  }

  public handleAddFriend(selectedUser: UserType) {
    const currentUser = this.userStateService.getCurrentUser()();
    if (currentUser && currentUser.id && selectedUser.id) {
      this.channelsApiService.createFriendChat(currentUser, selectedUser);
      this.loadChannels();
      this.toggleAddFriend();
    }
  }

  public toggleChannelCreate() {
    this.isCreateChannelVisible = !this.isCreateChannelVisible;
    this.isAddFriendVisible = false;
    this.userSearch = '';
  }

  public handleChannelCreate() {
    var currentUser = this.userStateService.getCurrentUser()();
    if (currentUser && currentUser.id) {
      this.channelsApiService.createChannel({
        channelName: this.newChannelName,
        channelType: 'group',
        ownerId: currentUser.id,
        adminIds: [currentUser.id],
        memberIds: [currentUser.id]
      });

      this.loadChannels();
      this.toggleChannelCreate();
      this.newChannelName = '';
    }
  }
}
