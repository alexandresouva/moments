import { Component } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  faTimes = faTimes;
  faCircleCheck = faCircleCheck;

  // O construtor é público para que se tenha acesso ao service via template
  constructor(public messageService: MessageService) {}
}
