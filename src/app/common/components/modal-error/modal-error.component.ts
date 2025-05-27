import { Component } from '@angular/core';
import { GENERIC_ERROR } from '@common';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss'],
})
export class ModalErrorComponent {
  public modalError = GENERIC_ERROR;
}
