import { Component } from '@angular/core';
import { ModalErrorComponent } from './common/components/modal-error/modal-error.component';
import { SpinnerComponent } from './core/components/spinner/spinner.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    SpinnerComponent,
    ModalErrorComponent,
  ],
})
export class AppComponent {}
