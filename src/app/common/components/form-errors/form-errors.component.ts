import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
})
export class FormErrorsComponent {
  @Input() control!: AbstractControlDirective | AbstractControl;

  readonly errorMessages: any = {
    required: () => 'This value is required',
    minlength: (params: { requiredLength: boolean }) =>
      `Please enter at least ${params.requiredLength} characters`,
    maxlength: (params: { requiredLength: boolean }) =>
      `Please enter no more than ${params.requiredLength} characters`,
    min: (params: { min: number }) =>
      `Please enter a value greater than or equal to ${params.min}`,
    max: (params: { max: number }) =>
      `Please enter a value less than or equal to ${params.max}`,
    pattern: () => `Please check the input format`,
  };

  public showErrors(): boolean | null {
    return this.control?.errors && (this.control.dirty || this.control.touched);
  }

  public errorList(): Array<string> {
    let _errors: Array<any> = [];
    if (this.control.errors) {
      _errors = Object.keys(this.control.errors).map((field) =>
        this.getMessage(field, this.control.errors![field])
      );
    }

    return _errors.length ? [_errors[_errors.length - 1]] : [];
  }

  public trackByFn(index: number): number {
    return index;
  }

  protected getMessage(type: string, params: any): string {
    return this.errorMessages[type](params);
  }
}
