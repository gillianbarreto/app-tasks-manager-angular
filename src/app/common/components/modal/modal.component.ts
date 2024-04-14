import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [ CommonModule ]
})
export class ModalComponent {

  @Input() title: string = "";
  @Input() message: string = "";
  @Input() primaryButtonText: string = "Aceptar";
  @Input() secondaryButtonText: string = "Cancelar";
  @Input() primaryButtonDisabled: boolean = false;

  @Output() onPrimaryAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSecondaryAction: EventEmitter<any> = new EventEmitter<any>();

  success() {
    this.onPrimaryAction.emit();
  }

  cancel() {
    this.onSecondaryAction.emit();
  }
}
