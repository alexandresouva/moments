import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@Angular/forms';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css'],
})
export class MomentFormComponent implements OnInit {
  @Input() btnText!: string;

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

  submitForm() {
    if (this.momentForm.valid) {
      console.log('Enviou formulário');
    }
    console.log(this.description);
  }
}
