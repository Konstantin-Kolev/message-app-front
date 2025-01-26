import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
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

  @Output()
  public onChannelDelete = new EventEmitter();

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

  public dropdownState: { [key: string]: boolean } = {
    isAddAdminVisible: false,
    isAddUserVisible: false,
    isUserListVisible: false,
    isAdminListVisible: false,
    isRenameVisible: false,
    isDeleteVisible: false
  }

  public userSearch: string = '';
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

  private toggleDropown(dropdownStateField: string): void {
    const toggleValue = !this.dropdownState[dropdownStateField];
    for(const k in this.dropdownState) {
      this.dropdownState[k] = false;
    }
    this.dropdownState[dropdownStateField] = toggleValue;
  }

  public toggleAddAdmin(): void {
    this.toggleDropown('isAddAdminVisible');
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
    this.toggleDropown('isAdminListVisible');
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
    this.toggleDropown('isRenameVisible');
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
    this.toggleDropown('isAddUserVisible');
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
    this.toggleDropown('isUserListVisible');
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

  public toggleDelete(): void {
    this.toggleDropown('isDeleteVisible');
  }

  public handleChannelDelete(): void {
    if (this.selectedChannel && this.selectedChannel.id) {
      this.channelsApiService.removeChannel(this.selectedChannel.id);
      this.onChannelDelete.emit();
      this.toggleDelete();
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
