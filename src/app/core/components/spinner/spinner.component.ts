import { Component } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
  imports: [NgIf],
})
export class SpinnerComponent {
  public spinner!: boolean;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.returnSpinner().subscribe((spinner: boolean) => {
      this.spinner = spinner;
    });
  }
}
