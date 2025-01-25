import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MessageType } from '../../models/message.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash, faUserMinus, faUserPlus, faUsers, faUserTie, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ChannelType } from '../../models/channel.model';
import { MessagesApiService } from '../../services/messages-api.service';
import { UserStateService } from '../../services/user-state.service';
import { UserType } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { UserApiService } from '../../services/user-api.service';
import { ChannelsApiService } from '../../services/channels-api.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, FilterPipe],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent implements OnChanges {

  constructor(private messagesApi: MessagesApiService,
    private userStateService: UserStateService,
    private userApiService: UserApiService,
    private channelsApiService: ChannelsApiService) {
    this.currentUser = this.userStateService.getCurrentUser()();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedChannel'].currentValue) {
      this.loadMessagesForChannel(changes['selectedChannel'].currentValue);
      this.loadMemberInformation(changes['selectedChannel'].currentValue);
      this.loadPossibleUsers(changes['selectedChannel'].currentValue);
      this.loadAdminInformation(changes['selectedChannel'].currentValue);
    }
  }

  @Input()
  public selectedChannel: ChannelType | null = null;

  editIcon = faPenToSquare;
  deleteIcon = faTrash;
  adminIcon = faUserTie;
  userMinusIcon = faUserMinus;
  addUserIcon = faUserPlus;
  usersIcon = faUsers;
  closeIcon = faXmark;

  public channelMessages: MessageType[] = [];
  public possibleUsers: UserType[] = [];
  public channelMembers: UserType[] = [];
  public channelAdmins: UserType[] = [];
  public currentUser: UserType | null;
  public currentMessage: string = '';

  public isAddAdminVisible: boolean = false;
  public isAddUserVisible: boolean = false;
  public isUserListVisible: boolean = false;
  public isAdminListVisible: boolean = false;
  public userSearch: string = '';

  public isRenameVisible: boolean = false;
  public newName: string = '';

  private loadMessagesForChannel(channel: ChannelType): void {
    this.channelMessages = this.messagesApi.getMessagesForChannel(channel);
  }

  private loadPossibleUsers(channel: ChannelType): void {
    this.possibleUsers = this.userApiService.getUsersNotInChannel(channel);
  }

  private loadMemberInformation(channel: ChannelType): void {
    this.channelMembers = this.userApiService.getChannelMemebers(channel);
  }

  private loadAdminInformation(channel: ChannelType): void {
    this.channelAdmins = this.userApiService.getChannelAdmins(channel);
  }

  public toggleAddAdmin(): void {
    this.isAddAdminVisible = !this.isAddAdminVisible;
    this.userSearch = '';
  }

  public handleAdminAdd(selectedUser: UserType): void {
    if (this.selectedChannel && this.selectedChannel.id && selectedUser.id) {
      this.channelsApiService.addAdminToChannel(this.selectedChannel.id, selectedUser.id);
      this.loadAdminInformation(this.selectedChannel);
      this.toggleAddAdmin();
    }
  }

  public toggleAdminList(): void {
    this.isAdminListVisible = !this.isAdminListVisible;
    this.userSearch = '';
  }

  public handleRemoveAdmin(selectedUser: UserType): void {
    if (this.selectedChannel && this.selectedChannel.id && selectedUser.id) {
      this.channelsApiService.removeAdminFromChannel(this.selectedChannel.id, selectedUser.id);
      this.loadAdminInformation(this.selectedChannel);
      this.toggleAdminList();
    }
  }

  public toggleRenameForm(): void {
    this.isRenameVisible = !this.isRenameVisible;
    this.newName = '';
  }

  public handleChannelRename(): void {
    if (this.newName !== '' && this.selectedChannel && this.selectedChannel.id) {
      this.channelsApiService.renameChannel(this.selectedChannel.id, this.newName);
      this.selectedChannel.channelName = this.newName;
      this.toggleRenameForm();
    }
  }

  public toggleAddUser(): void {
    this.isAddUserVisible = !this.isAddUserVisible;
    this.userSearch = '';
  }

  public handleAddUser(selectedUser: UserType): void {
    if (this.selectedChannel && this.selectedChannel.id && selectedUser.id) {
      this.channelsApiService.addMemberToChannel(this.selectedChannel.id, selectedUser.id);
      this.loadMemberInformation(this.selectedChannel);
      this.loadPossibleUsers(this.selectedChannel);
      this.toggleAddUser();
    }
  }

  public toggleUsersList(): void {
    this.isUserListVisible = !this.isUserListVisible;
    this.userSearch = '';
  }

  public handleRemoveUser(selectedUser: UserType): void {
    if (this.selectedChannel && this.selectedChannel.id && selectedUser.id) {
      this.channelsApiService.removeMemberFromChannel(this.selectedChannel.id, selectedUser.id);
      this.loadMemberInformation(this.selectedChannel);
      this.loadPossibleUsers(this.selectedChannel);
      this.loadAdminInformation(this.selectedChannel);
      this.toggleUsersList();
    }
  }

  public handleMessageSubmit(): void {
    var currentUser = this.userStateService.getCurrentUser()();
    if (this.currentMessage !== '' && this.selectedChannel?.id && currentUser && currentUser.id) {
      this.messagesApi.createMessage({
        channelId: this.selectedChannel.id,
        sentBy: currentUser.username,
        senderId: currentUser.id,
        message: this.currentMessage,
        timestamp: new Date().toLocaleString('en-GB')
      });

      this.loadMessagesForChannel(this.selectedChannel);
      this.currentMessage = '';
    };
  }
}
