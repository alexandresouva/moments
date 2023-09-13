import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'src/app/Interfaces/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css'],
})
export class MomentFormComponent implements OnInit {
  @Input() btnText!: string;
  @Output() onSubmit = new EventEmitter<Moment>();
  momentForm!: FormGroup;

  // Executado antes da inicialização do componente. Injeção de dependências.
  constructor() {}

  // Executado após a inicialização do componente
  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
      image: new FormControl(''),
    });
  }

  // Sem o Getter, o acesso via template seria mais verboso
  // momentForm.get('description').invalid
  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.momentForm.patchValue({ image: file });
  }

  submitForm() {
    if (this.momentForm.valid) {
      this.onSubmit.emit(this.momentForm.value);
      console.log('Enviou dados do formulário');
    }
  }
}
