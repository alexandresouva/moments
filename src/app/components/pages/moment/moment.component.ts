import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  Validators,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { Moment } from 'src/app/Interfaces/Moment';
import { Comment } from 'src/app/Interfaces/Comment';
import { CommentService } from 'src/app/services/comment.service';
import { MomentService } from 'src/app/services/moment.service';
import { MessageService } from 'src/app/services/message.service';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

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

  commentForm!: FormGroup;

  constructor(
    private momentService: MomentService,
    private messageService: MessageService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      updated_at: new FormControl(new Date()),
    });
  }

  // COMMENT INPUTS
  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async removeMoment(id: number) {
    await this.momentService.removeMoment(id).subscribe();
    this.messageService.add('Momento excluído com sucesso.');

    setTimeout(() => this.router.navigate(['/']), 800);
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.valid) {
      const data: Comment = this.commentForm.value;

      data.momentId = Number(this.moment?.id);

      await this.commentService
        .createComment(data)
        .subscribe((comment) => this.moment?.comments?.push(comment.data));

      this.messageService.add('Comentário adicionado.');
      this.commentForm.reset();
      formDirective.resetForm();
    }

    console.log();
  }
}
