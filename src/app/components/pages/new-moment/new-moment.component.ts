import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Moment } from 'src/app/Interfaces/Moment';
import { MomentService } from './../../../services/moment.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent {
  btnText = 'Compartilhar';

  constructor(
    private momentService: MomentService,
    private messageService: MessageService,
    private router: Router
  ) {}

  async createHandler(moment: Moment) {
    // Foi escolhido o formData para poder enviar o arquivo de imagem, do contrário, poderia ser um JSON
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    await this.momentService.createMoment(formData).subscribe();
    this.messageService.add('O seu momento foi registrado.');

    setTimeout(() => this.router.navigate(['/']), 1500);
  }
}
