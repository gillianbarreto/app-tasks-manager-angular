import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ModalErrorComponent } from '@shared';
import { SpinnerComponent } from '@core/components';

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
