import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Interfaces/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { faTimes, faEdit, faE } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  // ICONS
  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private momentService: MomentService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));
  }

  async removeMoment(id: number) {
    await this.momentService.removeMoment(id).subscribe();
    this.messageService.add('Momento excluído com sucesso.');

    setTimeout(() => this.router.navigate(['/']), 800);
  }
}
