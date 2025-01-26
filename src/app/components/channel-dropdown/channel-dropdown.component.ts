import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ChannelType } from '../../models/channel.model';

@Component({
  selector: 'channel-dropdown',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './channel-dropdown.component.html',
  styleUrl: './channel-dropdown.component.css'
})
export class ChannelDropdownComponent {

  @Input()
  public header: string = '';

  @Input()
  public contentList: ChannelType[] = [];

  public expanded: boolean = false;
  rightChevron = faChevronRight;
  downChevron = faChevronDown;

  public headerOnClick() {
    this.expanded = !this.expanded;
  }

  @Output()
  public onChannelSelect = new EventEmitter();

}
