import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MessageType } from '../../models/message.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash, faUserMinus, faUserPlus, faUserTie, faXmark } from '@fortawesome/free-solid-svg-icons';
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
    }
  }

  @Input()
  public selectedChannel: ChannelType | null = null;

  editIcon = faPenToSquare;
  deleteIcon = faTrash;
  adminIcon = faUserTie;
  addUserIcon = faUserPlus;
  removeUserIcon = faUserMinus;
  closeIcon = faXmark;

  public channelMessages: MessageType[] = [];
  public channelMembers: UserType[] = [];
  public channelAdmins: UserType[] = [];
  public currentUser: UserType | null;
  public currentMessage: string = '';

  public isAdminDropdownVisible: boolean = false;
  public userSearch: string = '';

  public isRenameVisible: boolean = false;
  public newName: string = '';

  private loadMessagesForChannel(channel: ChannelType): void {
    this.channelMessages = this.messagesApi.getMessagesForChannel(channel);
  }

  private loadMemberInformation(channel: ChannelType): void {
    this.channelMembers = this.userApiService.getChannelMemebers(channel);
  }

  private loadAdminInformation(channel: ChannelType): void {
    this.channelAdmins = this.userApiService.getChannelAdmins(channel);
  }

  public toggleAdminPannel(): void {
    this.isAdminDropdownVisible = !this.isAdminDropdownVisible;
    this.userSearch = '';
  }

  public handleAdminAdd(selectedUser: UserType): void {
    if (this.selectedChannel && this.selectedChannel.id && selectedUser.id) {
      this.channelsApiService.addAdminToChannel(this.selectedChannel.id, selectedUser.id);
      this.loadAdminInformation(this.selectedChannel);
      this.toggleAdminPannel();
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
