import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChatWindowComponent } from "../chat-window/chat-window.component";
import { ChannelListComponent } from "../channel-list/channel-list.component";
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserStateService } from '../../services/user-state.service';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "../../side-bar/side-bar.component";
import { LoginFormComponent } from "../authentication/login-form/login-form.component";
import { Router } from '@angular/router';

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
}
