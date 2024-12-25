import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
  public contentList: string[] = [];

  public expanded: boolean = false;
  rightChevron = faChevronRight;
  downChevron = faChevronDown;

  public headerOnClick() {
    this.expanded = !this.expanded;
  }

}
