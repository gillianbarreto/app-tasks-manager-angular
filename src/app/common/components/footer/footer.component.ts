import { Component } from '@angular/core';
import { environment } from '@environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
})
export class FooterComponent {
  public year = new Date().getFullYear();
  public appName = environment.APP_NAME;
}
