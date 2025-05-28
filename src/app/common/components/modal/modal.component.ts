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
  @Input() title = '';
  @Input() message = '';
  @Input() primaryButtonText: string = MODALS.primaryButtonText;
  @Input() secondaryButtonText: string = MODALS.secondaryButtonText;
  @Input() primaryButtonDisabled = false;

  @Output() primaryAction: EventEmitter<void> = new EventEmitter<void>();
  @Output() secondaryAction: EventEmitter<void> = new EventEmitter<void>();

  public success(): void {
    this.primaryAction.emit();
  }

  public cancel(): void {
    this.secondaryAction.emit();
  }
}
