import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MODALS } from '@common';

@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [CommonModule],
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() primaryButtonText: string = MODALS.primaryButtonText;
  @Input() secondaryButtonText: string = MODALS.secondaryButtonText;
  @Input() primaryButtonDisabled: boolean = false;

  @Output() onPrimaryAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSecondaryAction: EventEmitter<any> = new EventEmitter<any>();

  public success(): void {
    this.onPrimaryAction.emit();
  }

  public cancel(): void {
    this.onSecondaryAction.emit();
  }
}
