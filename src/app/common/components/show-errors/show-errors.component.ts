import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.scss']
})
export class ShowErrorsComponent {

  readonly errorMessages: any = {
    required: () => 'Este campo es requerido',
    minlength: (params: { requiredLength: boolean; }) => `Escribe al menos ${params.requiredLength} caracteres.`,
    maxlength: (params: { requiredLength: boolean; }) => `Solo puedes escribir máximo ${params.requiredLength} caracteres.`,
    min: (params: { min: number; }) => `El valor mínimo es ${params.min}.`,
    max: (params: { max: number; }) => `El valor máximo es ${params.max}.`,
    pattern: () => `El formato ingresado es incorrecto.`,
  };

  @Input() control!: AbstractControlDirective | AbstractControl;

  constructor() { }

  shouldShowErrors(): boolean | null  {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): Array<string> {
    let _errors: Array<any> = [];
    if (this.control.errors) {
      _errors = Object.keys(this.control.errors)
        .map(field => this.getMessage(field, this.control.errors![field]));
    }

    return _errors.length ? [_errors[_errors.length - 1]] : [];
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  protected getMessage(type: string, params: any): string {
    return this.errorMessages[type](params);
  }

}
