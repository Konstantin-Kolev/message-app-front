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

  constructor(private messagesApiService: MessagesApiService,
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
    this.messagesApiService.getMessagesForChannel(channel.id).subscribe((response: any) => {
      this.channelMessages = response.data;
    });
  }

  private loadPossibleUsers(channel: ChannelType): void {
    this.userApiService.getUsersNotInChannel(channel.id).subscribe((response: any) => {
      this.possibleUsers = response.data;
    });
  }

  private loadMemberInformation(channel: ChannelType): void {
    this.channelsApiService.getChannelMembers(channel.id).subscribe((response: any) => {
      this.channelMembers = response.data;
    });
  }

  private loadAdminInformation(channel: ChannelType): void {
    this.channelsApiService.getChannelAdmins(channel.id).subscribe((response: any) => {
      this.channelAdmins = response.data;
    });
  }

  public isCurrentUserAdmin() {
    if (this.currentUser) {
      return this.selectedChannel?.admins.some(user => user.id === this.currentUser!.id);
    }
    return false;
  }

  private toggleDropown(dropdownStateField: string): void {
    const toggleValue = !this.dropdownState[dropdownStateField];
    for (const k in this.dropdownState) {
      this.dropdownState[k] = false;
    }
    this.dropdownState[dropdownStateField] = toggleValue;
  }

  public toggleAddAdmin(): void {
    this.toggleDropown('isAddAdminVisible');
    this.userSearch = '';
  }

  public handleAdminAdd(selectedUser: UserType): void {
    if (this.selectedChannel) {
      this.channelsApiService.addAdminToChannel(this.selectedChannel.id, selectedUser.id).subscribe(() => {
        this.loadAdminInformation(this.selectedChannel!);
        this.toggleAddAdmin();
      });
    }
  }

  public toggleAdminList(): void {
    this.toggleDropown('isAdminListVisible');
    this.userSearch = '';
  }

  public handleRemoveAdmin(selectedUser: UserType): void {
    if (this.selectedChannel) {
      this.channelsApiService.removeAdminFromChannel(this.selectedChannel.id, selectedUser.id).subscribe(() => {
        this.loadAdminInformation(this.selectedChannel!);
        this.toggleAdminList();
      });
    }
  }

  public toggleRenameForm(): void {
    this.toggleDropown('isRenameVisible');
    this.newName = '';
  }

  public handleChannelRename(): void {
    if (this.newName !== '' && this.selectedChannel) {
      this.channelsApiService.renameChannel(this.selectedChannel.id, this.newName).subscribe(() => {
        this.selectedChannel!.name = this.newName;
        this.toggleRenameForm();
      });
    }
  }

  public toggleAddUser(): void {
    this.toggleDropown('isAddUserVisible');
    this.userSearch = '';
  }

  public handleAddUser(selectedUser: UserType): void {
    if (this.selectedChannel) {
      this.channelsApiService.addMemberToChannel(this.selectedChannel.id, selectedUser.id).subscribe(() => {
        this.loadMemberInformation(this.selectedChannel!);
        this.loadPossibleUsers(this.selectedChannel!);
        this.toggleAddUser();
      });
    }
  }

  public toggleUsersList(): void {
    this.toggleDropown('isUserListVisible');
    this.userSearch = '';
  }

  public handleRemoveUser(selectedUser: UserType): void {
    if (this.selectedChannel) {
      this.channelsApiService.removeMemberFromChannel(this.selectedChannel.id, selectedUser.id).subscribe(() => {
        this.loadMemberInformation(this.selectedChannel!);
        this.loadPossibleUsers(this.selectedChannel!);
        this.loadAdminInformation(this.selectedChannel!);
        this.toggleUsersList();
      });
    }
  }

  public toggleDelete(): void {
    this.toggleDropown('isDeleteVisible');
  }

  public handleChannelDelete(): void {
    if (this.selectedChannel) {
      this.channelsApiService.removeChannel(this.selectedChannel.id).subscribe(() => {
        this.onChannelDelete.emit();
        this.toggleDelete();
      });
    }
  }

  public handleMessageSubmit(): void {
    var currentUser = this.userStateService.getCurrentUser()();
    if (this.currentMessage !== '' && this.selectedChannel && currentUser) {
      this.messagesApiService.createMessage({
        channelId: this.selectedChannel.id,
        senderId: currentUser.id,
        content: this.currentMessage,
        timestamp: new Date().toLocaleString('en-GB')
      }).subscribe(() => {
        this.loadMessagesForChannel(this.selectedChannel!);
        this.currentMessage = '';
      });
    };
  }
}
